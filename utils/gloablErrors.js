const handleDuplicates = (err, res) => {
  res.status(400).json({ message: "cannot accept duplicate fields" });
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

const handleJwtExpireError = (err, res) => {
  res
    .status(401)
    .json({ message: "Your token expired, please try again later" });
};

const handleJwtInvalidError = (err, res) => {
  console.log('error occured');
  res
    .status(401)
    .json({ message: "Your token expired, please try again later" });
};

const sendErrorResponse = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode || 500,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  sendErrorResponse(err, req, res);
  if (err.code === 11000) handleDuplicates(err, res);
  if (err.name === "ValidationError") handleValidationError(err, res);
  if (err.name === "TokenExpiredError") handleJwtExpireError(err, res);
  if (err.name === "JsonWebTokenError") handleJwtInvalidError(err, res);
};
