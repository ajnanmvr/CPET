const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
