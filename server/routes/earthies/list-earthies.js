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

router.get("/get-historic-data", isLoggedIn, (req, res, next) => {
  EarthChip.find({ _user: req.user._id })
    .lean()
    .then(earthies => {
      let macAddresses = earthies.map(earthie => {
        return earthie.macAddress;
      });

      Promise.all(macAddresses).then(results => {
        EarthChipData.find(
          { macAddress: { $in: results } },
          {},
          { sort: { created_at: -1 } }
        ).then(earthieData => {
          res.json(
            earthies.map(earthie => {
              earthie.data = earthieData.filter(
                earthieDataElt =>
                  earthieDataElt.macAddress === earthie.macAddress
              );
              return earthie;
            })
          );
        });
      });
    })

    .catch(err =>
      res
        .status(500)
        .json({ message: "Unexpected error, please try again later." })
    );
});

module.exports = router;
