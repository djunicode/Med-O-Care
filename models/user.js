const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userSchema = new Schema(
  {
    fName: {
      type: String,
      required: true,
      validate(value) {
        if (!/^[A-Za-z\s]*$/.test(value)) {
          throw new Error("Name should contain only alphabets and spaces");
        }
      },
    },
    lName: {
      type: String,
      validate(value) {
        if (!/^[A-Za-z\s]*$/.test(value)) {
          throw new Error("Name should contain only alphabets and spaces");
        }
      },
    },
    role: {
      type: String,
      enum: ["user", "doctor"],
      default: "user",
    },
    pfpPublicID: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      },
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    dob: Date,
    gender: {
      type: String,
    },
    location: String, // City
    password: {
      type: String,
      required: true,
    },
    aadhar: {
      type: Number,
      min: 100000000000, // Coz 12 digits
      max: 999999999999,
    },
    medicalFiles: [
      {
        name: {
          type: String,
        },
        fileSecure_url: {
          type: String,
        },
        delete_token: {
          type: String,
        },
        viewCount:{
          type:Number,
          default:0
        },
        dateOfUpload:{
          type:Date
        }
      },
    ],
    medicalFileCount: {
      type: Number,
      default: 0,
    },
    insuranceFiles: [
      {
        name: {
          type: String,
        },
        fileSecure_url: {
          type: String,
        },
        delete_token: {
          type: String,
        },
        viewCount:{
          type:Number,
          default:0
        },
        dateOfUpload:{
          type:Date,
        }
      },
    ],
    insuranceFileCount: {
      type: Number,
      default: 0,
    },
    height: Number, // only meters
    weight: Number, // unit is Kg
    health_score: Number,
    period_lastDay: Date, // not sure
    period_how_long: Number,
    period_mc_duration: Number,
    period_dates: [
      [
        {
          // Array of array of dates in each month
          type: Date,
        },
      ],
    ],
    pill_reminder: [
      {
        name: Date,
        duration: Number,
      },
    ],
    OTP: {
      type: Number,
    },
    medicines : [{
      type : mongoose.Types.ObjectId,
      ref : "medicine"
    }]
  },
  { timestamps: true }
);

// Hashing the password
userSchema.pre("save", async function (next) {
  try {
    const hashedPass = bcrypt.hash(this.password, process.env.SALT);
    this.password = hashedPass;
    next();
  } catch (error) {
    console.log(error);
  }
});

const UserSchema = mongoose.model("user", userSchema);
module.exports = UserSchema;
