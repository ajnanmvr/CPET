const router = require("express").Router();
const Configuration = require("../models/configurationModel");
const catchAsync = require("../utils/catchAsync");

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    let data = await Configuration.create(req.body);
    res.status(200).json(data);
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    let data = await Configuration.find();
    res.status(200).json(data);
  })
);
router.patch(
  "/:id",
  catchAsync(async (req, res) => {
    let data = await Configuration.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(data);
  })
);
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    let data = await Configuration.findByIdAndUpdate(req.params.id);
    res.status(200).json(data);
  })
);
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    await Configuration.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  })
);

module.exports = router;
