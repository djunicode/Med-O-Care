const userC = require("../controllers/userController.js")
const express = require("express")
const auth = require('../middlewares/auth')
const fileVerify = require("../middlewares/fileVerify")
const exerciseC = require("../controllers/exerciseController")

const router = express.Router()

//get list of all exercises that can be performed
router.get("/allExercises", exerciseC.allExercises)

//get specific exercise
router.post("/specificExercises", exerciseC.specificExercise)

//list of target muscles in body
router.get("/targetMuscle", exerciseC.listOfTargetMuscle)

//get exercise for specific target muscle mentioned
router.post("/targetMuscleExercise", exerciseC.targetMuscleExercise)

module.exports = router;