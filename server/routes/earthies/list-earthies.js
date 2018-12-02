const express = require("express");
const EarthChip = require("../../models/EarthChip");
const { isLoggedIn } = require("../middlewares");
const EarthChipData = require("../../models/EarthChipData");

const router = express.Router();

// ALL ROUTES PREFIXED WITH /api/list-earthies/get-data
router.get("/", isLoggedIn, (req, res, next) => {
  EarthChip.find({ _user: req.user._id })
    .then(earthies => {
      res.status(200).json(earthies);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Unexpected error, please try again later." })
    );
});

router.get("/get-historic-data/:macAddress", isLoggedIn, (req, res, next) => {
  EarthChipData.find({ macAddress: req.params.macAddress })
    .sort({ created_at: -1 })
    .limit(5)
    .then(earthieData => {
      res.status(200).json(earthieData);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Unexpected error, please try again later." });
    });
});

module.exports = router;
