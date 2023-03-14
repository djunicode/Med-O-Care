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

module.exports = router;