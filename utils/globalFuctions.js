const APIFeatures = require("./ApiFeatures");

exports.createOne = (Model) => async (req, res,next) => {
  try {
    let data = await Model.create({ ...req.body });
    res.status(200).json(data);
  } catch (error) {
    next(error)
  }
};
exports.getAll = (Model, populateOptions) => async (req, res) => {
  try {
    //EXECUTE THE QUERY

    const features = new APIFeatures(
      Model.find().populate(populateOptions),
      req.query
    ) //[Tour.find()] is the queryObj & [req.query] is queryString
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    //SEND RESPONSE
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getOne = (Model, populateOptions) => async (req, res) => {
  try {
    let data = await Model.findById(req.params.id).populate(populateOptions);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateOne = (Model) => async (req, res) => {
  console.log(req.body);
  try {
    const item = await Model.findById(req.params.id);
    if (item) {
      let data = await Model.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "document not found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json(error);
  }
};
exports.deleteStatus = (Model) => async (req, res) => {
  try {
    let data = await Model.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteOne = (Model) => async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "document deleted" });
  } catch (error) {
    res.status(400).json(error);
  }
};
