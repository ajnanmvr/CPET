const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const { protect, restrictTo } = require("../controllers/authController");
const Course = require("../models/courseModel");
const multer = require("multer");
const AppError = require("../utils/AppError");
const CourseAccount = require("../models/courseAccountModel");
const jwt = require("jsonwebtoken");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

cron.schedule("0 1 * * *", async () => {
  let data = await CourseAccount.find({ verified: false });
  data.forEach((element) => {
    element.delete();
  });
  console.log("deleted");
});

async function sendEmail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nehyanjanish@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
      // clientId: process.env.GOOGLE_CLIENT_ID,
      // clientSecret: process.env.GOOGLE_SECRET,
    },
  });

  // send mail with defined transport object
   await transporter.sendMail({
    from: 'nehyanjanish@gmail.com', // sender address
    to: "janishnehyan03@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
}

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
    console.log(data);
    const newUser = await CourseAccount.create({
      ...req.body,
      registrationId: data[0].registrationId + 1,
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res
      .cookie("jwt", token, {
        httpOnly: true,
        // max age 30 days
        maxAge: 3600000 * 24 * 30,
      })
      .status(200);
    newUser.password = undefined;
    res.status(200).json({
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }
    const user = await CourseAccount.findOne({ email }).select("+password");
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

        res
          .cookie("jwt", token, {
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
