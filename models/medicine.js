const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const medicineSchema = new Schema(
  {
    medicineName: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
    },
    startTime: {
      type: String,
    },
    countLeft: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

const MedicineSchema = mongoose.model("medicine", medicineSchema);
module.exports = MedicineSchema;
