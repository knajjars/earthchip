const express = require("express");
const EarthChip = require("../../models/EarthChip");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

// ALL ROUTES PREFIXED WITH /api/delete

router.delete("/:macAddress", isLoggedIn, (req, res, next) => {
  EarthChip.findOneAndDelete({ macAddress: req.params.macAddress })
    .then(el => {
      res.status(200).json({ message: "Deleted succesfully!" });
    })
    .catch(err => res.status(500).json({ message: "Awful things happened." }));
});

module.exports = router;
