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
  recipients: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
