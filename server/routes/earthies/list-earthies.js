const express = require("express");
const EarthChip = require("../../models/EarthChip");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

// ALL ROUTES PREFIXED WITH /api/list-earthies

router.get("/", isLoggedIn, (req, res, next) => {
  EarthChip.find({ _user: req.user._id })
    .then(earthies => {
      res.status(200).json(earthies);
      return;
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Unexpected error, please try again later." })
    );
});

module.exports = router;
