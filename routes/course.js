const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const { protect, restrictTo } = require("../controllers/authController");
const Course = require("../models/courseModel");
const multer = require("multer");
const AppError = require("../utils/AppError");
const CourseAccount = require("../models/courseAccountModel");
const jwt = require("jsonwebtoken");
const cron = require("node-cron");
const Email = require("../utils/sendEmail");

cron.schedule("0 1 * * *", async () => {
  let data = await CourseAccount.find({ verified: false });
  data.forEach((element) => {
    element.delete();
  });
  console.log("deleted");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const uploads = multer({ storage: storage });
router.post(
  "/",
  protect,
  restrictTo("superAdmin"),
  catchAsync(async (req, res, next) => {
    const uploadSingle = uploads.single("image");
    uploadSingle(req, res, async (err) => {
      if (!err) {
        let data = await Course.create({
          ...req.body,
          image: req.file.filename,
        });
        res.status(200).json(data);
      } else {
        next(new AppError("Error occured", 400));
      }
    });
  })
);

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    let data = await Course.find().sort("-createdAt");
    res.status(200).json(data);
  })
);
router.delete(
  "/:id",
  catchAsync(async (req, res, next) => {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ deleted: true });
  })
);
router.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    let data = await Course.findById(req.params.id);
    res.status(200).json(data);
  })
);

router.post("/signup", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await CourseAccount.findOne({ email });
    if (user && user.verified) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    let data = await CourseAccount.find().sort({ registrationId: -1 }).limit(1);

    const newUser = await CourseAccount.create({
      ...req.body,
      registrationId: data[0] ? data[0].registrationId + 1 : 298377,
    });
    let emailResponse = await new Email({
      email: newUser.email,
      registrationId: newUser.registrationId,
      name: newUser.name,
      res: res,
    }).send("OTP", "Email from CPET Dhiu");
    res.status(200).json({ newUser, emailResponse: emailResponse.response });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { registrationId, password } = req.body;
    if (!registrationId || !password) {
      return res.status(400).json({
        message: "Please provide registration ID and password",
      });
    }
    const user = await CourseAccount.findOne({ registrationId }).select(
      "+password"
    );

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    } else {
      const isValidPassword = await user.correctPassword(
        password,
        user.password
      );
      if (!isValidPassword) {
        return res.status(400).json({
          message: "Invalid password",
        });
      } else {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "90d",
        });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user.verified = true;
        await user.save();

        res
          .cookie("course_token", token, {
            httpOnly: true,
            // max age 30 days
            maxAge: decoded.exp,
          })
          .status(200);
        // remove password from user object
        user.password = undefined;
        res.json(user);
      }
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
