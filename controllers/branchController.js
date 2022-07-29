const Branch = require("../models/branchModel");
const globalFuctions = require("../utils/globalFuctions");
const admin = require("firebase-admin");
const uuid = require("uuid-v4");
const dotenv = require("dotenv");
const fs = require("fs");
const Auth = require("../models/authModel");
const sharp = require("sharp");

dotenv.config();
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SECRET)),
  storageBucket: "gs://cpet-2093a.appspot.com",
});

const bucket = admin.storage().bucket();

async function uploadFile(fileName1, fileName2) {
  try {
    const metadata = {
      metadata: {
        // This line is very important. It's to create a download token.
        firebaseStorageDownloadTokens: uuid(),
      },
      contentType: "image/png",
      cacheControl: "public, max-age=31536000",
    };

    // Uploads a local file to the bucket
    let data = await bucket.upload(fileName1, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: metadata,
    });
    // fs.unlinkSync(fileName1);
    // fs.unlinkSync(fileName2);
    return data;
  } catch (error) {
    console.log(error);
  }
}

exports.createBranch = async (req, res, next) => {
  try {
    await sharp(`${__dirname + "/uploads/" + req.file.filename}`)
      .resize(320, 240)
      .toFile(`${__dirname + "/sharped/" + req.file.filename}`);

    let uploadData = await uploadFile(
      `${__dirname + "/sharped/" + req.file.filename}`,
      `${__dirname + "/uploads/" + req.file.filename}`
    );

    let data = await Branch.create({
      ...req.body,
      image: uploadData[1].mediaLink,
    });
    let user = await Auth.create({ ...req.body, branch: data._id });
    data.admin = user._id;
    data.save();
    res.status(200).json({
      data,
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.editBranch = async (req, res) => {
  try {
    let uploadData = null;
    if (req.file) {
      let data = await uploadFile(
        `${__dirname + "/uploads/" + req.file.filename}`
      );
      uploadData = data[1].mediaLink;
    } else {
      uploadData = req.body.image;
    }
    let data = await Branch.findByIdAndUpdate(req.params.id, {
      ...req.body,
      image: uploadData,
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getBranch = globalFuctions.getOne(Branch);
exports.getAllBranches = globalFuctions.getAll(Branch);
exports.deleteBranch = globalFuctions.deleteStatus(Branch);
