const express = require("express");
const EarthChipData = require("../../models/EarthChipData");

const router = express.Router();

// ALL ROUTES PREFIXED WITH /api/data-earthchip

router.post("/", (req, res, next) => {
  console.log(req.body);

  if (
    !req.body.macAddress ||
    !req.body.environmentHumidity ||
    !req.body.environmentTemp ||
    !req.body.soilMoisture ||
    !req.body.time
  ) {
    res.status(500).json({ message: "Information is incomplete!" });
    return;
  }

  const data = ({
    macAddress,
    environmentTemp,
    environmentHumidity,
    soilMoisture,
    time
  } = req.body);

  EarthChipData.create(data)
    .then(data => {
      res.json(data);
    })
    .catch(err => next(err));
});

module.exports = router;
