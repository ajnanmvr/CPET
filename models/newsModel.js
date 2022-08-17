const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  newsName: {
    type: String,
    required: [true, "Please add a news name"],
  },
  newsDate: {
    type: Date,
    required: [true, "Please add a time"],
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please select a category"],
    ref:"NewsCategory"
  },
  image: {
    type: String,
    required: [true, "Please add a image"],
  },
});

const News = mongoose.model("News", newsSchema);
module.exports = News;
