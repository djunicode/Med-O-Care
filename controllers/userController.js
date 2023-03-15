const UserSchema = require('../models/user');
const signAccessToken = require('../middlewares/auth').signAccessToken;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const fs = require('fs');

/*let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    port: 4,
  }); */

// New user
const createUser = async (req, res) => {
    try {
        let userData = new UserSchema(req.body);
        let savedUserData = await userData.save();
        let id = savedUserData._id;
        let userMail = savedUserData.email;
        
        /*mailTransporter.sendMail({
            from: process.env.EMAIL,
            to: userMail,
            subject: "Thank you for creating an account with us" + savedUserData.fname,
            text: "We hope you have a good time with our app.",
        }); */
        
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
            res.status(201).json({
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

module.exports = {
    createUser,
    loginUser,
    profile
}