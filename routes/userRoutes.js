const userC = require("../controllers/userController.js")
const express = require("express")
const auth = require('../middlewares/auth')

const router = express.Router()

// Create user
router.post("/signup", userC.createUser)

// Login user
router.post("/login", userC.loginUser)

// Get account details
router.get("/profile", auth.verifyToken, userC.profile)

//send otp for forgot password
router.get("/forgotPSWD", userC.forgotPSWD)

//verify OTP 
router.get("/verifyOTP", auth.verifyToken, userC.verifyOTP)   //then hit edit user details to reset password

//edit user details
router.post("/editUserInfo", auth.verifyToken, userC.updateUser)

module.exports = router;