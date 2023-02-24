const { protect, restrictTo } = require("../controllers/authController");
const Message = require("../models/messageModel");

const router = require("express").Router();

router.post("/add", protect, restrictTo("superAdmin"), async (req, res) => {
  try {
    let data = await Message.create({
      title: req.body.title,
      link: req.body.link,
      recipients: req.body.recipients.map((user) => ({ user })),
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
router.post("/unread-messages", protect, async (req, res) => {
  try {
    Message.countDocuments({
      // Set a filter to match all messages where the current user is a recipient and the read property is false
      "recipients.user": req.user._id,
      "recipients.read": false,
    })
      .then((count) => {
        console.log(`Unread messages count: ${count}`);
        res.status(200).json(count);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json(error);
      });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
router.post("/recipient/:recipient", protect, async (req, res) => {
  try {
    await Message.updateMany(
      { "recipients.user": req.user._id },
      { $set: { "recipients.$.read": true } },
      { new: true }
    ).catch(err=>{
      console.log(err);
    })
    let data = await Message.find({ "recipients.user": req.params.recipient });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/", protect, restrictTo("superAdmin"), async (req, res) => {
  try {
    let data = await Message.find().populate("recipients.user", "username _id");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/:id", protect, async (req, res) => {
  try {
    let data = await Message.findById(req.params.id);
    if (!"data.recipients.user" === req.user._id) {
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
router.post("/delete", protect, async (req, res) => {
  try {
    let data = await Message.findByIdAndDelete(req.query.id);
    res.status(200).json({ deleted: true });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
