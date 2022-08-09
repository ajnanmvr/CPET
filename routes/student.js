const multer = require("multer");
const { protect, restrictTo } = require("../controllers/authController");
const studentController = require("../controllers/studentController");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage: storage });

router.post("/register", studentController.registerStudent);
router.post(
  "/excel",
  protect,
  uploads.single("excelFile"),
  studentController.excelUpload
);
router.post("/", studentController.getAllStudents);
router.post("/admission-requests", studentController.getAdmissionRequests);
router.post(
  "/my-students",
  protect,
  restrictTo("admin"),
  studentController.getMyStudents
);
router.get("/details/:branch", studentController.getBranchDetails);
router.post("/all-details/", studentController.getAllDetails);
router.post(
  "/update-admission/",
  protect,
  studentController.updateAdmissionNumber
);

router.get("/:id", studentController.getStudent);
router.delete("/:id", studentController.deleteStudent);
router.patch("/:id", studentController.updateStudent);

module.exports = router;
