const Class = require("../models/classModel");
const catchAsync = require("../utils/catchAsync");
const router = require("express").Router();

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    let data = await Class.create(req.body);
    res.status(200).json(data);
  })
);
router.get(
  "/",
  catchAsync(async (req, res, next) => {
    let data = await Class.find();
    res.status(200).json(data);
  })
);
router.patch(
  "/:id",
  catchAsync(async (req, res, next) => {
    let data = await Class.findByIdAndUpdate(req.params.id, {
      className: req.body.className,
    });
    res.status(200).json(data);
  })
);
router.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    let data = await Class.findById(req.params.id);
    res.status(200).json(data);
  })
);

module.exports = router;
