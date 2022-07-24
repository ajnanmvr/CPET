const { protect, restrictTo } = require("../controllers/authController");
const ParentSubject = require("../models/parentSubjectModel");

const router = require("express").Router();

router
  .route("/")
  .post(protect, restrictTo("superAdmin"), async (req, res) => {
    try {
      let data = await ParentSubject.create(req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .get(async (req, res) => {
    try {
      let data = await ParentSubject.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router;
