const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const earthChip = new Schema(
  {
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    macAddress: { type: String, unique: true, required: true },
    plantName: String,
    watering: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium"
    },
    imageURL: String
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
