const UserSchema = require("../models/user");
const signAccessToken = require("../middlewares/auth").signAccessToken;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const cloudinary = require("cloudinary");
const MedicineSchema = require("../models/medicine");

//add medicine
const addMedicine = async (req, res) => {
  try {
    const { medicineName, frequency, countLeft } = req.body;
    const user = req.user;
    const medicine = new MedicineSchema(req.body);
    const medicineSaved = await medicine.save();

    const updateUser = await UserSchema.findByIdAndUpdate(
      { _id: user._id },
      { $push: { medicines: medicineSaved._id } }
    );
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//delete medicine

const deleteMedicine = async (req, res) => {
  try {
    const { medicineID } = req.body;
    const deleteMedicine = await MedicineSchema.findByIdAndDelete({
      _id: medicineID,
    });
    const deleteFromUser = await UserSchema.findByIdAndUpdate(
      { _id: req.user._id },

      { $pull: { medicines: medicineID } }
    );

    res.status(200).json({
      success: true,
      data: deleteMedicine,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateCount = async (req, res) => {
  try {
    const { medicineID, count } = req.body;
    const updateCount = await MedicineSchema.findByIdAndUpdate(
      { _id: medicineID },
      { $inc: { countLeft: count } }
    );

    res.status(200).json({
        success : true,
        data : updateCount
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addMedicine,
  deleteMedicine,
  updateCount
};
