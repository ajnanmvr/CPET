const mongoose = require("mongoose");
const slugify = require("slugify");

const branchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    uppercase: true,
    required: true,
  },
  phone: {
    type: String,
    uppercase: true,
    required: true,
  },
  district: {
    type: String,
    uppercase: true,
    required: true,
  },
  state: {
    type: String,
    uppercase: true,
    required: true,
  },
  postOffice: {
    type: String,
    uppercase: true,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    uppercase: true,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  slug: String,
  image: String,
});

branchSchema.pre(/^find/, function (next) {
  //Effects all queries starts with FIND
  this.find({ deleted: { $ne: true } });
  next();
});

branchSchema.pre("save", function (next) {
  //pre middleware have a (next) key
  //works before .save() & .create() , not work in .insert() and not for findByIdAnd...
  this.slug = slugify(this.branchName, { lower: true });
  next();
});

const Branch = mongoose.model("Branch", branchSchema);
module.exports = Branch;
