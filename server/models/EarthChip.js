const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const earthChip = new Schema(
  {
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    macAddress: { type: String, unique: true, required: true },
    plantName: String,
    wateringType: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium"
    },
    imageURL: String,
    imageKey: String,
    lastWatered: { type: Date },
    suggestedWateringDate: Date,
    criticalWateringDate: Date,
    currentMoisture: Number,
    currentEnvironmentTemp: Number,
    currentEnvironmentHumidity: Number,
    plantHealth: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const EarthChip = mongoose.model("EarthChip", earthChip);
module.exports = EarthChip;
