const express = require("express");
const EarthChip = require("../../models/EarthChip");
const { isLoggedIn } = require("../middlewares");
const upload = require("../../configs/spaces");

const router = express.Router();

// ALL ROUTES PREFIXED WITH /api/register-chip

router.get("/", isLoggedIn, (req, res, next) => {
  res.json(req.query.macAddress);
});

router.post("/", isLoggedIn, upload, (req, res, next) => {
  const { macAddress, plantName } = req.body;
  const imageURL = req.file
    ? req.file.location
    : "https://earthchip.sfo2.digitaloceanspaces.com/defaultimage.png";
  if (plantName === "") {
    res
      .status(500)
      .json({ message: "Please define a name for your EarthChip device." });
    return;
  }

  EarthChip.findOne({ macAddress }).then(chip => {
    if (chip !== null) {
      res
        .status(404)
        .json({ message: "The Earth Chip has already been registered." });
      return;
    } else {
      EarthChip.create({
        _user: req.user._id,
        macAddress,
        plantName,
        imageURL
      }).then(chip => {
        res.json({ message: `Succesfully registered ${chip.plantName} chip!` });
      });
    }
  });
});

module.exports = router;
