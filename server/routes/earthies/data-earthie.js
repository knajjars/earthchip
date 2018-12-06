const express = require("express");
const EarthChipData = require("../../models/EarthChipData");
const EarthChip = require("../../models/EarthChip");

const router = express.Router();

//* calculate the number of health points based on the last watering date
function getLastWateredPoints(lastWatered, interval) {
  const now = new Date();
  const timeDiff = Math.abs(lastWatered.getTime() - now.getTime());
  const diffDays = timeDiff / (1000 * 3600 * 24);
  let chunk = 10 / interval;
  let points = 40 - chunk * diffDays;
  return points;
}

//* calculate the number of health points based on the curent soil moisture
function getSoilMoisturePoints(moisture) {
  let points = 60 - Math.abs(40 - moisture) * 1.5;
  if (points < 0) {
    points = 0;
  }
  return points;
}

//* collate the data and generate points based on watering type
function getEarthieHealth(data) {
  const { type, lastWatered, soilMoisture } = data;
  let plantHealth,
    lastWateredPoints,
    soilMoisturePoints,
    nextWateringDate,
    criticalWateringDate;

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

//* Primary earthie data update route
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

      lastWatered =
        earthie.currentMoisture + 3 < data.soilMoisture
          ? new Date()
          : earthie.lastWatered;

      //! adding number of ms in a day
      const interval = {
        low: 2,
        medium: 4,
        high: 2
      };

      //! getting plant health
      const plantHealthInput = {
        type: earthie.wateringType,
        lastWatered: lastWatered,
        soilMoisture: soilMoisture
      };
      let plantHealth = getEarthieHealth(plantHealthInput);

      //! creating functions to calculate the next watering date
      let ms, msc, suggestedWateringDate, criticalWateringDate;
      ms = new Date().getTime() + 86400000 * interval[earthie.wateringType];
      msc =
        new Date().getTime() + 2 * 86400000 * interval[earthie.wateringType];

      if (plantHealth > 80) {
        suggestedWateringDate = new Date(ms);
        criticalWateringDate = new Date(msc);
      } else if (plantHealth > 70) {
        suggestedWateringDate = new Date();
        criticalWateringDate = new Date(new Date().getTime() + 86400000 * 2);
      } else {
        suggestedWateringDate = new Date();
        criticalWateringDate = new Date(new Date().getTime() + 86400000);
      }

      //* data to update
      const updatedData = {
        currentMoisture: data.soilMoisture,
        currentEnvironmentTemp: data.environmentTemp,
        currentEnvironmentHumidity: data.environmentHumidity,
        lastWatered: lastWatered,
        plantHealth,
        suggestedWateringDate,
        criticalWateringDate
      };
      const updateEarthie = EarthChip.findByIdAndUpdate(
        earthie._id,
        updatedData
      );

      const earthieData = EarthChipData.create(data);

      Promise.all([updateEarthie, earthieData])
        .then(data => {
          res.status(200).json({ message: "Good connection!" });
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
