// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const EarthChipData = require("../models/EarthChipData");
require("../configs/database");

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

let earthies = [
  {
    macAddress: "06-00-00-00-00-01",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-01",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-01",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-01",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-01",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-01",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-05",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-05",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-05",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-05",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-05",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-12",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-12",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-12",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-12",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-12",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-12",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-15",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-15",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-15",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-15",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  },
  {
    macAddress: "06-00-00-00-00-15",
    environmentTemp: Math.random(),
    environmentHumidity: Math.random(),
    soilMoisture: Math.random(),
    time: randomDate(new Date(2018, 11, 29), new Date())
  }
];

EarthChipData.deleteMany()
  .then(() => {
    return EarthChipData.create(earthies);
  })
  .then(earthiesCreated => {
    console.log(`${earthiesCreated.length} earthies created.`);
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
