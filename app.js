const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const branchRoutes = require("./routes/branch");
const teacherRoutes = require("./routes/teacher");
const paymentRoutes = require("./routes/payment");
const notificationRoutes = require("./routes/notification");
const subjectRoutes = require("./routes/subject");
const parentSubjectRoutes = require("./routes/parentSubject");
const transferRoutes = require("./routes/transfer");
const configurationRoutes = require("./routes/configuration");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const AppError = require("./utils/AppError");

dotenv.config();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.enable("trust proxy");
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //100 requests in one hour,
  message: "Too many requests, please try again after one hour",
});
//data sanitization against NoSql attacks
app.use(mongoSanitize());
//data sanitization against xss
app.use(xss()); //prevent from inserting HTML or others to DB
app.use(compression()); //works on texts

app.use(bodyParser.json());
app.use(express.json());
// app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static("uploads"));

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "hbs");

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/parent-subject", parentSubjectRoutes);
app.use("/api/transfer", transferRoutes);
app.use("/api/configuration", configurationRoutes);

app.use(require("./utils/gloablErrors"));
// app.all("*", (req, res, next) => {
//   next(new AppError(`Cant find ${req.originalUrl}  on the server`, 404));
// });
process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, 'public')));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
