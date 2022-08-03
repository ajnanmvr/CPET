const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");
const globalFunctions = require("../utils/globalFuctions");

exports.createUser = globalFunctions.createOne(Auth);
exports.createMultiUsers = async (req, res) => {
  console.log(req.body);
  try {
    let data = await Auth.insertMany(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.signUp = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await Auth.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = await Auth.create(req.body);
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
    res.status(500).json({
      message: err,
      err,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Please provide username and password",
      });
    }
    const user = await Auth.findOne({ username }).select("+password");
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
    res.status(500).json({
      message: err,
    });
  }
};
exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    message: "Logged out",
    success: true,
  });
};

exports.getUser = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id).populate("branch");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Error getting user",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await Auth.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    let password;
    if (req.body.password) {
      password = await bcrypt.hash(req.body.password, 12);
    }
    const updatedUser = await Auth.findByIdAndUpdate(req.params.id, {
      ...req.body,
      password,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error updating user",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find({ role: { $ne: "superAdmin" } }).populate(
      "branch"
    );
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "Error getting users",
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
      ? req.cookies.jwt
      : req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Auth.findById(decoded.userId);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    next();
  };
};

exports.checkUserLoggedIn = async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    res.status(200).json({ error: "user not logged in" });
  } else {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await Auth.findById(decoded.userId).populate("branch");
    res.status(200).json({ user: user });
  }
};
