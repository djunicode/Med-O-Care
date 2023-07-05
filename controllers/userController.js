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
require("dotenv").config();

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  port: 4,
});

function addDays(days, date = new Date()) {
  date.setDate(date.getDate() + parseInt(days));
  return date;
}

const getCloudinarySignature = async (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    cloudinaryConfig.api_secret
  );
  res.json({ timestamp, signature });
};

// New user
const createUser = async (req, res) => {
  try {
    let userData = new UserSchema(req.body);
    let savedUserData = await userData.save();
    let id = savedUserData._id;
    let userMail = savedUserData.email;

    mailTransporter.sendMail({
      from: process.env.EMAIL,
      to: userMail,
      subject:
        "Thank you for creating an account with us " +
        " " +
        savedUserData.fName,
      text: "We hope you have a good time using our app.",
    });

    let pass = await UserSchema.findById({ _id: id }, { password: 0 }); //to hide hashed pswd

    const accessToken = await signAccessToken(savedUserData._id);
    res.status(201).json({
      success: true,
      data: pass,
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserSchema.findOne({ email: email }).select(
      "-medicalFiles -medicalFileCount -insuranceFiles -insuranceFileCount -period_lastDay -period_how_long -period_mc_duration -OTP"
    );

    if (!user) {
      return res.status(400).json({
        error: "User does not exist",
      });
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (isPassValid) {
      user.password = null;
      const token = await signAccessToken(user._id);
      res.status(200).json({
        success: true,
        data: user,
        token: token,
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Wrong password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get account details
const profile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//forgot password

const forgotPSWD = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserSchema.findOne({ email: email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    await UserSchema.findOneAndUpdate({ email: email }, { OTP: otp });

    mailTransporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Forgot Password",
      text: "Enter the following OTP to reset password " + otp,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent via mail"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//enter otp for pswd reset

const verifyOTP = async (req, res) => {
  try {
    const email = req.body.email
    const otp = req.body.otp;
    // const user = await UserSchema.find({ email: req.user.email });

    if (req.user.OTP == otp) {
      await UserSchema.findOneAndUpdate(
        { email: email },
        { $set: { OTP: null } }
      );

      const token = await signAccessToken(req.user._id);

      res.status(200).json({
        success: true,
        message: "OTP verified",
        token: token,
      });
    } else {
      res.status(400).json({
        success: true,
        message: "Wrong OTP entered",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//edit user info

const updateUser = async (req, res) => {
  let email = req.user.email;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "fName",
    "lName",
    "location",
    "dob",
    "phone",
    "gender",
    "password",
    "email",
    "height",
    "weight",
    "health_score",
    "period_dates",
    "period_how_long",
    "period_mc_duration",
    "pill_reminder",
  ];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid Updates!" });
  }

  // let user = await UserSchema.findOne({ email: email });

  try {
    await UserSchema.findOneAndUpdate({ email: email }, { $set: req.body });
    let newPswd;
    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      newPswd = await UserSchema.findOneAndUpdate(
        { email: email },
        { password: hashedPassword }
      ).select(
        "-medicalFiles -medicalFileCount -insuranceFiles -insuranceFileCount -period_lastDay -period_how_long -period_mc_duration -OTP"
      );
    }
    newPswd.password = null;

    res.status(201).json({
      success: true,
      data: pass,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//get the files data
const getFiles = async (req, res) => {
  const userEmail = req.user.email;

  try {
    const user = await UserSchema.findOne(
      { email: userEmail },
      {
        medicalFiles: 1,
        medicalFileCount: 1,
        insuranceFiles: 1,
        insuranceFileCount: 1,
      }
    );

    if (!user) {
      return res.status(400).json({
        error: "User does not exist",
      });
    }

    const medicalFiles = user.medicalFiles.map((file) => ({
      type: "medical",
      name: file.name,
      fileSecure_url: file.fileSecure_url,
      delete_token: file.delete_token,
      viewCount: file.viewCount,
      dateOfUpload: file.dateOfUpload,
    }));

    const insuranceFiles = user.insuranceFiles.map((file) => ({
      type: "insurance",
      name: file.name,
      fileSecure_url: file.fileSecure_url,
      delete_token: file.delete_token,
      viewCount: file.viewCount,
      dateOfUpload: file.dateOfUpload,
    }));
    const medicalFileCount = user.medicalFileCount;
    console.log(medicalFiles);
    console.log(insuranceFiles);
    const insuranceFileCount = user.insuranceFileCount;

    // Merge medicalFiles and insuranceFiles into a single state object
    const filesState = {
      files: [...medicalFiles, ...insuranceFiles],
      medicalFileCount: medicalFileCount,
      insuranceFileCount: insuranceFileCount,
    };

    res.status(200).json({
      success: true,
      data: filesState,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//upload medical records
const uploadMedical = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const files = req.body.files;
    const medicalFiles = [];

    for (const file of files) {
      let fileName = file.name;
      const duplicateFileCount = await UserSchema.countDocuments({
        email: userEmail,
        "medicalFiles.name": new RegExp(`^${fileName}(?: \\(\\d+\\))?$`, "i"),
      });

      if (duplicateFileCount > 0) {
        let count = 1;
        let originalFileName = fileName;

        // Check if the file name already has a count appended in parentheses
        const countMatch = fileName.match(/^(.*) \((\d+)\)$/);

        if (countMatch) {
          // If count is present, extract the original file name and increment the count
          originalFileName = countMatch[1];
          count = parseInt(countMatch[2]) + 1;
        }

        // Append the count to the file name
        fileName = `${originalFileName} (${count})`;
      }

      medicalFiles.push({
        name: fileName,
        fileSecure_url: file.secure_url,
        delete_token: file.delete_token,
        dateOfUpload: new Date(),
      });
    }

    const data = await UserSchema.findOneAndUpdate(
      { email: userEmail },
      {
        $push: { medicalFiles: { $each: medicalFiles } },
        $inc: { medicalFileCount: files.length },
      }
    ).select("-_id");

    res.status(201).json({
      success: true,
      message: "Record uploaded successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//delete a medial record
const deleteMedical = async (req, res) => {
  try {
    const token = req.body.deleteToken;

    const deleteDoc = await UserSchema.updateOne(
      { "medicalFiles.delete_token": token },
      { $pull: { medicalFiles: { delete_token: token } } }
    );

    res.status(200).json({
      success: true,
      data: deleteDoc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//delete insurance record

const deleteInsurance = async (req, res) => {
  try {
    const token = req.body.deleteToken;

    const deleteDoc = await UserSchema.updateOne(
      { "insuranceFiles.delete_token": token },
      { $pull: { insuranceFiles: { delete_token: token } } }
    );

    res.status(200).json({
      success: true,
      data: deleteDoc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateViewCount = async (req, res) => {
  try {
    const name = req.body.name;
    const userEmail = req.user.email;
    const fileType = req.body.fileType;

    let updateQuery = {};

    if (fileType === "medical") {
      updateQuery = {
        $inc: {
          "medicalFiles.$[file].viewCount": 1,
        },
      };
    } else if (fileType === "insurance") {
      updateQuery = {
        $inc: {
          "insuranceFiles.$[file].viewCount": 1,
        },
      };
    } else {
      throw new Error("Invalid file type");
    }

    const userObject = await UserSchema.findOneAndUpdate(
      {
        email: userEmail,
        $or: [{ "medicalFiles.name": name }, { "insuranceFiles.name": name }],
      },
      updateQuery,
      {
        arrayFilters: [{ "file.name": name }],
      }
    );
    res
      .status(200)
      .json({ success: true, message: "View count updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: "Could not update count, please try again",
    });
  }
};

//upload insurance records
const uploadInsurance = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const files = req.body.files;
    const insuranceFiles = [];

    for (const file of files) {
      let fileName = file.name;
      const duplicateFileCount = await UserSchema.countDocuments({
        email: userEmail,
        "insuranceFiles.name": new RegExp(`^${fileName}(?: \\(\\d+\\))?$`, "i"),
      });

      if (duplicateFileCount > 0) {
        let count = 1;
        let originalFileName = fileName;

        // Check if the file name already has a count appended in parentheses
        const countMatch = fileName.match(/^(.*) \((\d+)\)$/);

        if (countMatch) {
          // If count is present, extract the original file name and increment the count
          originalFileName = countMatch[1];
          count = parseInt(countMatch[2]) + 1;
        }

        // Append the count to the file name
        fileName = `${originalFileName} (${count})`;
      }

      insuranceFiles.push({
        name: fileName,
        fileSecure_url: file.secure_url,
        delete_token: file.delete_token,
        dateOfUpload: new Date(),
      });
    }

    const data = await UserSchema.findOneAndUpdate(
      { email: userEmail },
      {
        $push: { insuranceFiles: { $each: insuranceFiles } },
        $inc: { insuranceFileCount: files.length },
      }
    );

    res.status(201).json({
      success: true,
      message: "Records uploaded successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// period tracker

const periodTracker = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const lastDay = req.body.lastDay;
    const how_long = req.body.howLong;
    const duration = req.body.duration;

    // Calculating the dates
    let index = 0;
    let dates = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < how_long; j++) {
        if (j == 0 && i == 0) {
          dates[index] = addDays(duration, new Date(lastDay));
        } else if (j == 0) {
          dates[index] = addDays(duration, new Date(dates[index - 1]));
        } else {
          dates[index] = addDays(1, new Date(dates[index - 1]));
        }
        index++;
      }
    }

    // Organizing dates in separate arrays for each month
    let month = new Date(dates[0]).getMonth();
    let month_i = 0;
    dates_array = [[], []];
    for (i in dates) {
      if (new Date(dates[i]).getMonth() != month) {
        month = new Date(dates[i]).getMonth();
        month_i++;
        dates_array[month_i] = [];
      }
      dates_array[month_i].push(dates[i]);
    }

    await UserSchema.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          period_lastDay: lastDay,
          period_how_long: how_long,
          period_mc_duration: duration,
          period_dates: dates_array,
        },
      }
    );

    res.status(200).json({
      success: true,
      data: dates_array,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getPeriodDates = async (req, res) => {
  try {
    const user = req.user;
    const lastDay = user.period_lastDay;
    const how_long = user.period_how_long;
    const duration = user.period_mc_duration;
    const period_dates = user.period_dates;

    if (lastDay.length == 0) {
      res.status(200).json({
        success: true,
        message: "No dates entered",
      });
    }

    // The case where the user hasn't entered the recent dates, so the dates are old
    if (
      new Date(Date.now()) > addDays(2 * duration, new Date(period_dates[0][0]))
    ) {
      res.status(200).json({
        success: true,
        message: "Dates are old, need to be updated",
      });
    }

    res.status(200).json({
      success: true,
      lastDay: lastDay,
      how_long: how_long,
      duration: duration,
      period_dates: period_dates,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const medicineDosage = async (req, res) => {
  try {
    const email = req.user.email;
    const medicineName = req.body.medicineName;
    const frequency = req.body.frequency;

    const user = await UserSchema.findByIdAndUpdate(
      { email: email },
      { $push: { medicines: { name: medicineName, frequency: frequency } } }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Medicine uploaded succedfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports = {
  createUser,
  loginUser,
  profile,
  forgotPSWD,
  verifyOTP,
  updateUser,
  uploadMedical,
  uploadInsurance,
  periodTracker,
  getCloudinarySignature,
  medicineDosage,
  getFiles,
  updateViewCount,
  getPeriodDates,
  deleteMedical,
  deleteInsurance,
};
