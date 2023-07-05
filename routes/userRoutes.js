const userC = require("../controllers/userController.js");
const express = require("express");
const auth = require("../middlewares/auth");
const fileVerify = require("../middlewares/fileVerify");

const router = express.Router();

// Create user
router.post("/signup", userC.createUser);

// Login user
router.post("/login", userC.loginUser);

// Get account details
router.get("/profile", auth.verifyToken, userC.profile);

//send otp for forgot password
router.post("/forgotPSWD", userC.forgotPSWD);

//verify OTP
router.post("/verifyOTP", userC.verifyOTP); //then hit edit user api details to reset password

//edit user details
router.put("/editUserInfo", auth.verifyToken, userC.updateUser);

//get cloudinary signature so that later on when we get pfps public id we can confirm that this is valid and not some scripted malicious link
router.get("/getCloudinarySignature",userC.getCloudinarySignature)

//upload medical records
router.post(
    "/uploadMedical",
    auth.verifyToken,
    // fileVerify.fileVerifyPfp.single('file'),
    userC.uploadMedical
);

//delete medical records
router.post("/deleteMedical", auth.verifyToken, userC.deleteMedical)

//delete Insurance records
router.post("/deleteInsurance", auth.verifyToken, userC.deleteInsurance)

//upload insurance records
router.post(
    "/uploadInsurance",
    auth.verifyToken,
    // fileVerify.fileVerifyPfp.single('file'),
    userC.uploadInsurance
);

//upload the number of times a files is viewed 
router.post("/updateViewCount", auth.verifyToken, userC.updateViewCount)

//get the files
router.get("/getFiles", auth.verifyToken, userC.getFiles)

// period tracker
router.post("/periodTracker", auth.verifyToken, userC.periodTracker)

// get period dates
router.get("/getPeriodDates", auth.verifyToken, userC.getPeriodDates)

//upload medicine and dosage information 
router.post("/medicineDosage", auth.verifyToken, userC.medicineDosage)


module.exports = router;
