const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const spacesEndpoint = new aws.Endpoint("https://sfo2.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "earthchip",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: function(req, file, cb) {
      cb(null, req.user._id + Date.now().toString() + file.originalname);
    }
  })
}).single("upload");

module.exports = upload;
