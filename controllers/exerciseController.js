const UserSchema = require("../models/user");
const signAccessToken = require("../middlewares/auth").signAccessToken;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");


//all exercise list

const allExercises = async (req, res) => {
    try {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };
  
      const response = await axios.request(options);
  
      if (!response) {
        res.status(501).json({
          success: false,
          message: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          data: response.data,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  
  //get exercise by body part
  
const specificExercise = async (req, res) => {
    try {
      const bodyPart = req.body.bodyPart;
  
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises/bodyPart/" + bodyPart,
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };
  
      const response = await axios.request(options);
  
      if (!response) {
        res.status(501).json({
          success: false,
          message: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          data: response.data,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };


// get list of target muscle

const listOfTargetMuscle = async (req, res) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/targetList',
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
  
      const response = await axios.request(options);
  
      if (!response) {
        res.status(501).json({
          success: false,
          message: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          data: response.data,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

// get list of target muscle

const targetMuscleExercise = async (req, res) => {
    try {
      const targetMuscle = req.body.targetMuscle 
  
      const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/target/'+targetMuscle,
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
  
      const response = await axios.request(options);
  
      if (!response) {
        res.status(501).json({
          success: false,
          message: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          data: response.data,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };



  module.exports = {
    allExercises,
    specificExercise,
    listOfTargetMuscle,
    targetMuscleExercise
  }