const UserSchema = require('../models/user');
const signAccessToken = require('../middlewares/auth').signAccessToken;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const otpGenerator = require("otp-generator")

const fs = require('fs');

// let mailTransporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//     port: 4,
//   }); 

// New user
const createUser = async (req, res) => {
    try {
        let userData = new UserSchema(req.body);
        let savedUserData = await userData.save();
        let id = savedUserData._id;
        let userMail = savedUserData.email;
        
        // mailTransporter.sendMail({
        //     from: process.env.EMAIL,
        //     to: userMail,
        //     subject: "Thank you for creating an account with us" + savedUserData.fName,
        //     text: "We hope you have a good time with our app.",
        // }); 
        
        let pass = await UserSchema.findById( { _id: id }, {password: 0} ); //to hide hashed pswd
  
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
                error: "User does not exist"
            });
        }
    
        const withoutPswd = await UserSchema.findOne({ email: email }, {password: 0} );
    
        if (await bcrypt.compare(password, user.password)) {
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
const profile = async(req, res) => {
    try {
        
        res.status(200).json({
            success: true,
            data: req.user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

//forgot password 

const forgotPSWD = async (req,res) => {
    try{
    const email = req.body.email
    const user = await UserSchema.findOne({email : email})

    if(!user){
        res.status(404).json({
            success: false,
            message: "User not found"
        })

    const token = await signAccessToken(user._id)

    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    await UserSchema.findOneAndUpdate({ email: email }, { OTP: otp })

    mailTransporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: "Forgot Password",
        text: "Enter the following OTP to reset password " + otp,
      });

    res.status(200).json({
        success : true,
        message: "OTP sent via mail",
        token : token
    })
  

    }}catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//enter otp for pswd reset

const verifyOTP = async(req,res) => {

    try{
    const otp = req.body.otp
    const user = await UserSchema.find({email : req.user.email})

    if(user.OTP == otp){
        await UserSchema.findOneAndUpdate({email : req.user.email}, { $set : {OTP : null}})

        const token = await signAccessToken(user._id)

        res.status(200).json({
            success : true,
            message: "OTP verified",
            token : token
        })
    }else{
        res.status(400).json({
            success : true,
            message: "Wrong OTP entered",
        })
    }
}catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

//edit user info

const updateUser = async (req, res) => {
    let email = req.user.email;
  
    const updates = Object.keys(req.body);
    const allowedUpdates = ["fname", "lname", "number", "password", "email"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid Updates!" });
    }
  
    let user = await UserSchema.findOne({ email: email });
  
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      try {
        await UserSchema.findOneAndUpdate({ email: email },{ $set: req.body })
  
        if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        let newPswd = await UserSchema.findOneAndUpdate({ email: email },{ password: hashedPassword })
        }
  
        
        res.status(201).json({
          success: true,
          data: req.body,
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
    }
  };

module.exports = {
    createUser,
    loginUser,
    profile,
    forgotPSWD,
    verifyOTP,
    updateUser
}