const express = require("express");
const EarthChipData = require("../../models/EarthChipData");

const router = express.Router();

// ALL ROUTES PREFIXED WITH /api/data-earthchip

router.get(
  "/:macAddress/:environmentHumidity/:environmentTemp/:soilMoisture",
  (req, res, next) => {
    if (
      !req.params.macAddress ||
      !req.params.environmentHumidity ||
      !req.params.environmentTemp ||
      !req.params.soilMoisture
    ) {
      res.status(500).json({ message: "Information is incomplete!" });
      return;
    }

    const data = ({
      macAddress,
      environmentTemp,
      environmentHumidity,
      soilMoisture
    } = req.params);

    EarthChipData.create(data)
      .then(data => {
        res.json(data);
      })
      .catch(err => next(err));
  }
);

module.exports = router;
