const express = require("express");
const EarthChip = require("../../models/EarthChip");
const { isLoggedIn } = require("../middlewares");
const upload = require("../../configs/spaces");
const aws = require("aws-sdk");

const router = express.Router();

// ALL ROUTES PREFIXED WITH /api/edit-earthie
router.patch("/:macAddress", isLoggedIn, upload, (req, res, next) => {
  if (req.file) {
    req.body.imageURL = req.file.location;
    req.body.imageKey = req.file.key;
  }
  if (req.body.plantName === "") {
    res.status(500).json({ message: "Please enter a valid name!" });
    return;
  }

  EarthChip.findOneAndUpdate(
    {
      _user: req.user._id,
      macAddress: req.params.macAddress
    },
    req.body
  )
    .then(earthie => {
      if (earthie.imageKey) {
        const spacesEndpoint = new aws.Endpoint(
          "https://sfo2.digitaloceanspaces.com"
        );
        const s3 = new aws.S3({
          endpoint: spacesEndpoint
        });
        var params = {
          Bucket: "earthchip",
          Key: earthie.imageKey
        };
        s3.deleteObject(params, function(err, data) {
          if (err) res.status(500).json({ message: "Bad stuff happened." });
          return;
        });
      }
      if (!earthie) {
        res
          .status(500)
          .json({ message: "Earthie not registered to this account." });
      }
      res.status(200).json(earthie);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "We are pretty sure something terribly happened." })
    );
});

module.exports = router;
