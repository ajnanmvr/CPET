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

router.route("/").post(createTeacher).get(protect, getAllTeachers);

router
  .route("/:id")
  .patch(protect, updateTeacher)
  .get(protect, getMyTeachers)
  .delete(protect, deleteTeacher)
  .post(protect, getOneTeacher);

module.exports = router;
