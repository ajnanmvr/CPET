const router = require("express").Router();
const Schedule = require("../models/scheduleModel");
const catchAsync = require("../utils/catchAsync");

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    let data = await Schedule.create(req.body);
    res.status(200).json(data);
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    let data = await Schedule.find();
    res.status(200).json(data);
  })
);

router.patch(
  "/:id",
  catchAsync(async (req, res) => {
    let data = await Schedule.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(data);
  })
);
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    let data = await Schedule.findOne({ name: req.params.id });
    res.status(200).json(data);
  })
);
router.post(
  "/:id",
  catchAsync(async (req, res) => {
    let data = await Schedule.findById(req.params.id);
    res.status(200).json(data);
  })
);
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    await Schedule.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  })
);

module.exports = router;
