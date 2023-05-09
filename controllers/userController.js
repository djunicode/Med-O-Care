const UserSchema = require("../models/user");
const signAccessToken = require("../middlewares/auth").signAccessToken;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    port: 4,
});

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
                "Thank you for creating an account with us " + " " +
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
        const user = await UserSchema.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                error: "User does not exist",
            });
        }

        const withoutPswd = await UserSchema.findOne(
            { email: email },
            { password: 0 }
        );

        const isPassValid = await bcrypt.compare(password, user.password);

        if (isPassValid) {
            const token = await signAccessToken(user._id);
            res.status(200).json({
                success: true,
                data: withoutPswd,
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

        const token = await signAccessToken(user._id);

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
            message: "OTP sent via mail",
            token: token,
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
        const otp = req.body.otp;
        // const user = await UserSchema.find({ email: req.user.email });

        if (req.user.OTP == otp) {
            await UserSchema.findOneAndUpdate(
                { email: req.user.email },
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
    const allowedUpdates = ["fName", "lName","location", "phone", "gender", "password", "email","height","weight", "health_score", "period_dates", "period_how_long", "period_mc_duration", "pill_reminder"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).json({ message: "Invalid Updates!" });
    }

    // let user = await UserSchema.findOne({ email: email });

    try {
        await UserSchema.findOneAndUpdate({ email: email }, { $set: req.body });

        if (req.body.password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            let newPswd = await UserSchema.findOneAndUpdate(
                { email: email },
                { password: hashedPassword }
            );
        }

        let pass = await UserSchema.findById(
            { _id: req.user._id },
            { password: 0 }
        ); //to hide hashed pswd

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

//upload medical records

const uploadMedical = async (req, res) => {
    try {
        const userEmail = req.user.email;

        const buffer = req.file;
        // const arrOfPosts = [];
        // var fileCount = 0;
        // for (var i = 0; i < buffer.length; i++) {
        //   arrOfPosts[i] = buffer[i].buffer;
        //   fileCount++;
        // }

        await UserSchema.findOneAndUpdate(
            { email: userEmail },
            { $push : { medicalFiles: { name : req.body.name , file : buffer.buffer}}, 
              $inc : { medicalFileCount: 1 }}
        );

        res.status(201).json({
            success: true,
            message: "Record uploaded succedfully!",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

//upload insurance records

const uploadInsurance = async (req, res) => {
    try {
        const userEmail = req.user.email;

        const buffer = req.file;
        // const arrOfPosts = [];
        // var fileCount = 0;
        // for (var i = 0; i < buffer.length; i++) {
        //   arrOfPosts[i] = buffer[i].buffer;
        //   fileCount++;
        // }

        await UserSchema.findOneAndUpdate(
            { email: userEmail },
            { $push : { insuranceFiles: { name : req.body.name , file : buffer.buffer}}, 
              $inc : { insuranceFileCount: 1 }}
        );
        res.status(201).json({
            success: true,
            message: "Record uploaded succedfully!",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// period tracker

const periodTracker = async(req, res) => {
    try {
        const userEmail = req.user.email;
        const lastDay = req.params.lastDay;
        const how_long = req.params.how_long;
        const duration = req.params.duration;

        function addDays (days, date) {
            date.setDate(date.getDate() + parseInt(days));
            return date;
        }

        let index = 0;
        let dates = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < how_long; j++) {
                if (j == 0 && i == 0) {
                    dates[index] = addDays(duration, new Date(lastDay))
                }
                else if (j == 0) {
                    dates[index] = addDays(duration, new Date(dates[index-1]))
                }
                else {
                    dates[index] = addDays(1, new Date(dates[index-1]))
                }
                index++;
            }
        }

        await UserSchema.findOneAndUpdate(
            { email: userEmail }, 
            { $set: {period_lastDay: lastDay, period_how_long: how_long, period_mc_duration: duration, period_dates: dates} }
        );

        res.status(200).json({
            success: true,
            data: dates
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const medicineDosage = async (req,res) => {
    try{
      const email = req.user.email
    const medicineName = req.body.medicineName
    const frequency = req.body.frequency
  
    const user = await UserSchema.findByIdAndUpdate(
      { email : email},
      { $push : { medicines : { name : medicineName, frequency : frequency}}} 
      )
  
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        })
      }
  
      res.status(201).json({
        success: true,
        message: "Medicine uploaded succedfully!",
      })
    }catch(err){
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

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
    medicineDosage
};
