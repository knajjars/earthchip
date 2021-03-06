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
  const { macAddress, plantName, wateringType, lastWatered } = req.body;

  if (macAddress === "") {
    res.status(500).json({
      message:
        "Not a valid Mac Address, make sure to scan the QR code correctly."
    });
    return;
  }

  const imageURL = req.file
    ? req.file.location
    : "https://earthchip.sfo2.digitaloceanspaces.com/defaultimage.png";

  const imageKey = req.file ? req.file.key : null;
  if (plantName === "") {
    res.status(500).json({ message: "Please define a name Earthie device." });
    return;
  }

  if (wateringType === "") {
    res.status(500).json({
      message: "Please define a watering level for your Earthie device."
    });
    return;
  }

  if (lastWatered === "") {
    res.status(500).json({
      message:
        "Try to remember the last time you watered your plant, we know it's hard."
    });
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
        imageURL,
        imageKey,
        wateringType,
        lastWatered
      }).then(chip => {
        res.json({
          message: `Succesfully registered ${chip.plantName}'s earthie!`
        });
      });
    }
  });
});

module.exports = router;
