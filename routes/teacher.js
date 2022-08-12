const {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  getOneTeacher,
  deleteTeacher,
  getMyTeachers,
} = require("../controllers/teacherController");
const { protect, restrictTo } = require("../controllers/authController");

const router = require("express").Router();

router
  .route("/")
  .post(createTeacher)
  .get(protect, restrictTo("superAdmin"), getAllTeachers);

router
  .route("/:id")
  .patch(protect, updateTeacher)
  .get(protect, getMyTeachers)
  .post(protect, getOneTeacher);

module.exports = router;
