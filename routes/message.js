const { protect, restrictTo } = require("../controllers/authController");
const Message = require("../models/messageModel");

const router = require("express").Router();

router.post("/", protect, restrictTo("superAdmin"), async (req, res) => {
  try {
    let data = await Message.create({
      title: req.body.title,
      link: req.body.link,
      recipient: req.body.recipient,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.patch("/", protect, async (req, res) => {
  try {
    let data = await Message.find({ recipient: req.user._id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/", protect, restrictTo("superAdmin"), async (req, res) => {
  try {
    let data = await Message.find().populate("recipient", "username _id");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/:id", protect, async (req, res) => {
  try {
    let data = await Message.findById(req.params.id);
    if (!data.recipient === req.user._id) {
      res.status(400).json({ error: "You cannot access this message" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
router.patch("/:id", protect, async (req, res) => {
  try {
    let data = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.delete("/:id", protect, async (req, res) => {
  try {
    let data = await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ deleted: true });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
