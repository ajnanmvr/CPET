const Transfer = require("../models/transferModel");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    let data = await Transfer.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    let data = await Transfer.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
