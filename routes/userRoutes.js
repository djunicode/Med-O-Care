const userC = require("../controllers/userController.js")
const express = require("express")
const auth = require('../middlewares/auth')
const fileVerify = require("../middlewares/fileVerify")

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
router.get("/verifyOTP", auth.verifyToken, userC.verifyOTP)   //then hit edit user api details to reset password

//edit user details
router.put("/editUserInfo", auth.verifyToken, userC.updateUser)

//upload medical records
router.post("/uploadMedical", auth.verifyToken, fileVerify.fileVerifyPfp.single('file'), userC.uploadMedical)

//upload insurance records
router.post("/uploadInsurance", auth.verifyToken, fileVerify.fileVerifyPfp.single('file'), userC.uploadInsurance)

// upload medicine information
router.post("/uploadInsurance", auth.verifyToken, fileVerify.fileVerifyPfp.single('file'), userC.uploadInsurance)

//upload medicine and dosage information 
router.post("/medicineDosage", auth.verifyToken, userC.medicineDosage)


module.exports = router;