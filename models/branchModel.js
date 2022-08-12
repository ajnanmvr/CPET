const mongoose = require("mongoose");
const slugify = require("slugify");

const branchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    uppercase: true,
    required: [true, "Branch Name is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  phone: {
    type: String,
    uppercase: true,
    unique: [true, "Phone number is already used"],
    required: [true, "Phone number is required"],
    maxLength: [15, "15 characters are allowed"],
  },
  branchCode: {
    type: String,
    uppercase: true,
    unique: [true, "Branch code is already used"],
    required: [true, "Branch code is required"],
    maxLength: [35, "35 characters are allowed"],
},
  district: {
    type: String,
    uppercase: true,
    required: [true, "District is required"],
    maxLength: [30, "30 characters are allowed"],
  },
  state: {
    type: String,
    uppercase: true,
    required: [true, "State is required"],
    maxLength: [30, "30 characters are allowed"],
  },
  postOffice: {
    type: String,
    uppercase: true,
    required: [true, "Post office is required"],
    maxLength: [30, "30 characters are allowed"],
  },
  pinCode: {
    type: String,
    required: [true, "pincode is required"],
    maxLength: [10, "10 characters are allowed"],
  },
  place: {
    type: String,
    uppercase: true,
    required: [true, "place is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  slug: String,
  image: String,
  admin: { type: mongoose.Types.ObjectId },
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
