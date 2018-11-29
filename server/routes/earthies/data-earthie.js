const express = require("express");
const EarthChipData = require("../../models/EarthChipData");
const EarthChip = require("../../models/EarthChip");

const router = express.Router();

function getLastWateredPoints(lastWatered, interval) {
  const now = new Date();
  const timeDiff = Math.abs(lastWatered.getTime() - now.getTime());
  const diffDays = timeDiff / (1000 * 3600 * 24);
  let chunk = 10 / interval;
  let points = 40 - chunk * diffDays;
  return points;
}

function getSoilMoisturePoints(moisture) {
  let points = 60 - Math.abs(40 - moisture) * 1.5;
  if (points < 0) {
    points = 0;
  }
  return points;
}

function getEarthieHealth(data) {
  const { type, lastWatered, soilMoisture } = data;
  let plantHealth, lastWateredPoints, soilMoisturePoints;

  //? get last watered points
  switch (type) {
    case "low":
      lastWateredPoints = getLastWateredPoints(lastWatered, 2);
      break;
    case "medium":
      lastWateredPoints = getLastWateredPoints(lastWatered, 4);
      break;
    case "high":
      lastWateredPoints = getLastWateredPoints(lastWatered, 7);
      break;
  }
  //? get soil moisture points
  soilMoisturePoints = getSoilMoisturePoints(soilMoisture);

  return lastWateredPoints + soilMoisturePoints;
}
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

  //* data from earthchip
  const data = ({
    macAddress,
    environmentTemp,
    environmentHumidity,
    soilMoisture
  } = req.query);

  EarthChip.findOne({ macAddress: macAddress }).then(earthie => {
    if (!earthie) {
      res.status(500).json({ message: "No registered Earthie found." });
      return;
    } else {
      let lastWatered;
      if (!earthie.currentMoisture) {
        lastWatered = new Date();
      } else {
        lastWatered =
          earthie.currentMoisture < data.soilMoisture
            ? new Date()
            : earthie.lastWatered;
      }

      const plantHealthInput = {
        type: earthie.wateringType,
        lastWatered: lastWatered,
        soilMoisture: soilMoisture
      };
      //* data to update
      const updatedData = {
        currentMoisture: data.soilMoisture,
        currentEnvironmentTemp: data.environmentTemp,
        currentEnvironmentHumidity: data.environmentHumidity,
        lastWatered: lastWatered,
        plantHealth: getEarthieHealth(plantHealthInput)
      };
      const updateEarthie = EarthChip.findByIdAndUpdate(
        earthie._id,
        updatedData
      );

      const earthieData = EarthChipData.create(data);

      Promise.all([updateEarthie, earthieData])
        .then(data => {
          res.json(data);
        })
        .catch(err => next(err));
    }
  });
});

router.get("/getSoilMoisture", (req, res, next) => {
  EarthChipData.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => next(err));
});

module.exports = router;
