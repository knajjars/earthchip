const express = require("express");
const EarthChip = require("../../models/EarthChip");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

// ALL ROUTES PREFIXED WITH /api/get-earthie
router.get("/:macAddress", isLoggedIn, (req, res, next) => {
  EarthChip.findOne({ macAddress: req.params.macAddress })
    .then(earthie => {
      res.status(200).json(earthie);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Unexpected error, please try again later." })
    );
});

module.exports = router;
