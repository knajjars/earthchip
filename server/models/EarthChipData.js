const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const earthChipData = new Schema(
  {
    macAddress: { type: String, required: true, index: true },
    environmentTemp: Number,
    environmentHumidity: Number,
    soilMoisture: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

earthChipData.index({ macAddress: 1 });

const EarthChipData = mongoose.model("EarthChipData", earthChipData);
module.exports = EarthChipData;
