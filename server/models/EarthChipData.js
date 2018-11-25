const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const earthChipData = new Schema(
  {
    macAddress: { type: String, unique: true, required: true },
    environmentTemp: Number,
    environmentHumidity: Number,
    soilMoisture: Number,
    time: { type: Date, default: Date.now }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const EarthChipData = mongoose.model("EarthChipData", earthChipData);
module.exports = EarthChip;
