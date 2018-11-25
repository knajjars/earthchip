const express = require("express");
const EarthChip = require("../models/EarthChip");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

// ALL ROUTES PREFIXED WITH /api/register-chip

router.get("/:mac_address", isLoggedIn, (req, res, next) => {
  res.json(req.params.mac_address);
});

router.post("/", isLoggedIn, (req, res, next) => {
  const { macAddress, plantName } = req.body;
  EarthChip.findOne({ macAddress }).then(chip => {
    if (chip !== null) {
      res
        .status(409)
        .json({ message: "The Earth Chip has already been registered." });
      return;
    }
    EarthChip.create({
      _user: req.user._id,
      macAddress,
      plantName
    }).then(chip => {
      res.json({ message: `Succesfully registered ${chip.plantName} chip!` });
    });
  });
});

module.exports = router;
