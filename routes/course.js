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
const crypto = require("crypto");

cron.schedule("0 1 * * *", async () => {
  let data = await CourseAccount.find({ verified: false });
  data.forEach((element) => {
    element.delete();
  });
  console.log("deleted");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/course");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const uploads = multer({ storage: storage });

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const user = await CourseAccount.findOne({ email });
    if (user && user.verified) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const newUser = await CourseAccount.create({
      ...req.body,
    });
    let emailResponse = await new Email({
      email: newUser.email,
      registrationId: newUser.registrationId,
      name: newUser.name,
      res: res,
      subject: "Email from CPET Dhiu",
      title: "Confirmation Email",
      otpToken: newUser.otpToken,
    }).send("OTP");
    res.status(200).json({ newUser, emailResponse: emailResponse.response });
  } catch (err) {
    next(err);
  }
});
router.get("/verify-token/:token", async (req, res) => {
  try {
    let user = await CourseAccount.findOne({
      otpToken: req.params.token,
    });
    if (user) {
      if (user.otpTokenExpires < Date.now) {
        res.render("token expired");
      } else {
        user.verified = true;
        user.otpToken = undefined;
        user.save();
        res.render("account-verified");
      }
    } else {
      res.render('something-went-wrong')
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Please provide email  and password",
      });
    } else {
      const user = await CourseAccount.findOne({ email }).select("+password");

      if (!user) {
        res.status(400).json({
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
    }
  } catch (err) {
    next(err);
  }
});

router.post("/checkLogin", async (req, res) => {
  let token = req.cookies.course_token;
  if (!token) {
    res.status(200).json({ error: "user not logged in" });
  } else {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await CourseAccount.findById(decoded.userId);
    res.status(200).json({ user: user });
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie("course_token");
  res.status(200).json({
    message: "Logged out",
    success: true,
  });
});

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
        next(err);
      }
    });
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    let data = await Course.find().sort("-createdAt");
    res.status(200).json(data);
  })
);
router.patch(
  "/:id",
  protect,
  restrictTo("superAdmin"),
  catchAsync(async (req, res) => {
    console.log(req.files);
    await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ deleted: true });
  })
);
router.delete(
  "/:id",
  protect,
  restrictTo("superAdmin"),
  catchAsync(async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ deleted: true });
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    let data = await Course.findById(req.params.id).populate(
      "learners.student"
    );
    res.status(200).json(data);
  })
);
const courseProtect = async (req, res, next) => {
  try {
    const token = req.cookies.course_token
      ? req.cookies.course_token
      : req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await CourseAccount.findById(decoded.userId);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};
router.patch(
  "/apply/:id",
  catchAsync(async (req, res) => {
    if (!req.body.student) {
      res.status(400).json({ message: "please type learner ID" });
    } else {
      let course = await Course.findByIdAndUpdate(req.params.id, {
        $push: {
          learners: {
            student: req.body.student,
          },
        },
      });
      res.status(200).json(course);
    }
  })
);
router.post(
  "/my-courses",
  courseProtect,
  catchAsync(async (req, res) => {
    let data = await Course.find({ "learners.student": req.user._id });
    res.status(200).json(data);
  })
);
router.post(
  "/resent-registerNo",
  catchAsync(async (req, res) => {
    let data = await CourseAccount.findOne({ email: req.body.email });
    await new Email({
      email: req.body.email,
      registrationId: data.registrationId,
      subject: "email from CPET dhiu",
      name: data.name,
    }).send("OTP");
    res.status(200).json({ success: true });
  })
);
router.post(
  "/forget-registerNo",
  catchAsync(async (req, res) => {
    let data = await CourseAccount.findOne({ email: req.body.email });
    if (data) {
      await new Email({
        email: req.body.email,
        registrationId: data.registrationId,
        subject: "email from CPET dhiu",
        name: data.name,
      }).send("OTP");
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({
        message: "There is no user in this email, please create an account",
      });
    }
  })
);
const createPasswordResetToken = (user) => {
  const resetToken = crypto.randomBytes(32).toString("hex"); //create a normal string
  user.passwordResetToken = crypto //convert the resetToken to encrypted
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; //expires in 10 minutes
  return resetToken;
};
router.post(
  "/forget-password",
  catchAsync(async (req, res, next) => {
    if (!req.body.email) {
      return res.status(400).json({ message: "Please enter your email" });
    } else {
      // 1) Get user by email
      const user = await CourseAccount.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).json({
          message: "There is no user in this email, please create an account",
        });
      } else {
        // 2) create random reset token
        const resetToken = createPasswordResetToken(user);
        await user.save({ validateBeforeSave: false });

        try {
          // 3 send to user's email
          const resetUrl = `${req.protocol}://${req.get(
            "host"
          )}/course/resetPassword/${resetToken}`;

          await new Email({
            email: user.email,
            url: resetUrl,
            res: res,
            subject: "Password Reset",
            registrationId: user.registrationId,
            name: user.name,
          }).send("passwordReset");
          res.status(200).json({
            status: "success",
            message: "token sent to email !",
          });
        } catch (error) {
          console.log(error);
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          await user.save({ validateBeforeSave: false });
          return next(new AppError("there was an error in sending email", 500));
        }
      }
    }
  })
);
router.post(
  "/resetPassword/:token",
  catchAsync(async (req, res) => {
    // 1) Get user based on token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await CourseAccount.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }, // check the token expired or not
    });
    // 2 if token not expires , set new password
    if (!user) {
      res.status(400).json({ message: "Token is invalid or has expired" });
    } else {
      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "90d",
      });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.cookie("course_token", token, {
        httpOnly: true,
        // max age 30 days
        maxAge: decoded.exp,
      });
      res.status(200).json({ success: true });
    }
  })
);
module.exports = router;
