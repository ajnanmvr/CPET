const Teacher = require("../models/teacherModel");
const globalFunction = require("../utils/globalFuctions");

exports.createTeacher = globalFunction.createOne(Teacher);
exports.getAllTeachers = globalFunction.getAll(Teacher, "branch");
exports.getOneTeacher = globalFunction.getOne(Teacher);
exports.deleteTeacher = globalFunction.deleteStatus(Teacher);
exports.updateTeacher = globalFunction.updateOne(Teacher);
exports.getMyTeachers = async (req, res) => {
  try {
    let data = await Teacher.find({
      branch: req.user.adminCollegeName,
      deleted:false
    }).populate("branch");
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json(error);
  }
};
