const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate(value){
            if (!(/^[A-Za-z\s]*$/.test(value))) {
                throw new Error("Name should contain only alphabets and spaces");
            }
        }
    },
    role: {
        type: String,
        default: "user"
    },
    pfp: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    dob: Date,
    gender: {
        type: String,
    },
    location: String, // City
    password: {
        type: String,
        required: true
    },
    aadhar: {
        type: Number,
        min: 100000000000,  // Coz 12 digits
        max: 999999999999
    },
    files: [{
        name: String,
        file: Buffer
    }],
    fileCount: {
        type: Number,
        default: 0
    },
    height: Number,  // Just either m or inch
    weight: Number,  // unit is Kg
    health_score: Number,
    peiod_lastDay: Date, // not sure
    priod_how_long: Number,
    period_mc_duration: Number,
    period_dates: [{
        type: Date // unsure
    }],
    pill_reminder: [{
        name: Date,
        duration: Number
    }]
}, {timestamps: true});


// Hashing the password
userSchema.pre("save", async function(next) {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(this.password, salt)
        this.password = hashedPass
        next()
    }catch(error){
        console.log(error)
    }
})


const UserSchema = mongoose.model("user", userSchema)
module.exports = UserSchema