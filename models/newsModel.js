const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    newsName: {
      type: String,
      required: [true, "Please add a news name"],
    },
    newsDate: {
      type: Date,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "NewsCategory",
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;
