const Student = require("../models/studentModel");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");
const globalFunctions = require("../utils/globalFuctions");
const mongoose = require("mongoose");
const Branch = require("../models/branchModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllStudents = globalFunctions.getAll(Student, "branch", "class");
exports.getStudent = globalFunctions.getOne(Student, "branch", "class");
exports.deleteStudent = globalFunctions.deleteStatus(Student);

exports.registerStudent = async (req, res, next) => {
  try {
    let data = await Student.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.updateStudent = globalFunctions.updateOne(Student);

exports.verifyStudent = async (req, res, next) => {
  try {
    let branch = await Branch.findById(req.user.branch);
    console.log(branch);
    let data = await Student.findByIdAndUpdate(req.params.id, {
      verified: true,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getMyStudents = async (req, res, next) => {
  try {
    let data = await Student.find({ branch: req.user.branch }).populate(
      "class",
      "className"
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getBranchDetails = async (req, res) => {
  try {
    let data = await Student.aggregate([
      {
        $match: { branch: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $group: {
          _id: "$class",
          numStudents: { $sum: 1 },
          verified: { $sum: "$verified" },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getAllDetails = async (req, res) => {
  try {
    let data;
    if (req.query.branch) {
      data = await Student.aggregate([
        {
          $match: { verified: true },
        },
        {
          $group: {
            _id: "$branch",
            numStudents: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "branches",
            localField: "_id",
            foreignField: "_id",
            as: "branch",
          },
        },
        {
          $project: { "branch.branchName": 1, numStudents: 1 },
        },
      ]);
    } else {
      data = await Student.aggregate([
        {
          $match: { verified: true },
        },
        {
          $group: {
            _id: "$class",
            numStudents: { $sum: 1 },
          },
        },
      ]);
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.updateAdmissionNumber = catchAsync(async (req, res, next) => {
  if (!req.body.start) {
    res.status(400).json({ error: "please add a starting number" });
  } else {
    let students = await Student.find({
      verified: true,
    });

    students.forEach((student, key) => {
      students[key].admissionNo = "CMS" + (parseInt(req.body.start) + key);
      student.save();
    });
    res.status(200).json(students);
  }
});
exports.getAdmissionRequests = async (req, res, next) => {
  try {
    let data = await Student.aggregate([
      { $match: { verified: false } },
      {
        $group: {
          _id: "$branch",
          numStudents: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "branches",
          localField: "_id",
          foreignField: "_id",
          as: "branch",
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.excelUpload = async (req, res) => {
  try {
    importExcelData2MongoDB(__dirname + "/uploads/" + req.file.filename);
  } catch (err) {
    res.status(500).json({
      message: "Error registering student",
      error: err,
    });
  }
};

function importExcelData2MongoDB(filePath) {
  // -> Read Excel File to Json Data
  const excelData = excelToJson({
    sourceFile: filePath,
    sheets: [
      {
        // Excel Sheet Name
        name: "Customers",
        // Header Row -> be skipped and will not be present at our result object.
        header: {
          rows: 1,
        },
        // Mapping columns to keys
        columnToKey: {
          B: "name",
          C: "address",
          D: "age",
        },
      },
    ],
  });

  // Insert Json-Object to MongoDB
  Student.insertMany(excelData.Customers, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully Excel FIle read");
    }
  });
  fs.unlinkSync(filePath);
}
