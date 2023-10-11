const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const AWS = require("aws-sdk");

const upload = multer();
const downloadSchema = new mongoose.Schema({
  fileName: { type: String, required: [true, "File is required"] },
  title: { type: String, required: [true, '"download" title is required'] },
  type: { type: String, required: true, enum: ["student", "admin"] },
});
const Download = mongoose.model("Download", downloadSchema);

const uploadFile = async (req) => {
  try {
    const spacesEndpoint = new AWS.Endpoint("blr1.digitaloceanspaces.com"); // Use the correct endpoint for your region
    const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET,
    });
    
    const { buffer } = req.file;
    const fileExtension = req.file.originalname.split('.').pop(); // Get the file extension

    // Set the bucket name and file path
    const bucketName = "cpet-storage";
    const filePath = `files/${req.body.title}.${fileExtension}`;

    // Set the upload parameters
    const uploadParams = {
      Bucket: bucketName,
      Key: filePath,
      Body: buffer, // Use the file buffer
      ACL: "public-read", // Set the desired ACL for the uploaded file
    };
    
    const uploadResult = await s3.upload(uploadParams).promise();
    const fileURL = uploadResult.Location;
    return fileURL;
  } catch (error) {
    console.log(error);
  }
};


router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    let fileUrl = await uploadFile(req);
    let data = await Download.create({
      title: req.body.title,
      fileName: fileUrl,
      type: req.body.type,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    let data = await Download.find({ type: req.query.type });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/student", async (req, res, next) => {
  try {
    let data = await Download.find({ type: "student" });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let data = await Download.findByIdAndDelete(req.params.id);
    fs.unlinkSync(`./uploads/${data.fileName}`);
    res.status(200).json({ deleted: true });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
