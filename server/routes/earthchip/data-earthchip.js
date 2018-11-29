const express = require("express");
const EarthChipData = require("../../models/EarthChipData");

const router = express.Router();

// ALL ROUTES PREFIXED WITH /api/data-earthchip

router.get("/", (req, res, next) => {
  if (
    !req.query.macAddress ||
    !req.query.environmentHumidity ||
    !req.query.environmentTemp ||
    !req.query.soilMoisture
  ) {
    res.status(500).json({ message: "Information is incomplete!" });
    return;
  }

  const data = ({
    macAddress,
    environmentTemp,
    environmentHumidity,
    soilMoisture
  } = req.query);

  EarthChipData.create(data)
    .then(data => {
      res.json(data);
    })
    .catch(err => next(err));
});

router.get("/getSoilMoisture", (req, res, next) => {
  EarthChipData.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => next(err));
});

module.exports = router;
