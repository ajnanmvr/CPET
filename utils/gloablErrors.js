const handleDuplicates = (err, res) => {
  res.status(400).json({ message: "Duplicate data not allowed" });
};
const handleValidationError = (err, res) => {
  let errors = {};
  const allErrors = err.message.substring(err.message.indexOf(":") + 1).trim();
  const allErrorInArrayFormat = allErrors.split(",").map((err) => err.trim());
  allErrorInArrayFormat.forEach((error) => {
    const [key, value] = error.split(":").map((err) => err.trim());
    errors[key] = value;
  });
  res.status(400).json(errors);
};

module.exports = (err, req, res, next) => {
  // if (err.code === 11000) handleDuplicates(err, res);
  if (err.name === "ValidationError") handleValidationError(err, res);
};
