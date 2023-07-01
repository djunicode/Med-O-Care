const userC = require("../controllers/userController.js");
const medicineC = require("../controllers/medicineController.js")
const express = require("express");
const auth = require("../middlewares/auth");
const fileVerify = require("../middlewares/fileVerify");

const router = express.Router();

//add medicine
router.post("/addmedicine", auth.verifyToken, medicineC.addMedicine)