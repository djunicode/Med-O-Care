const cron = require("node-cron");
const MedicineSchema = require("../models/medicine");
const UserSchema = require("../models/user");
const nodemailer = require("nodemailer");
require("dotenv").config();

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  port: 587, 
});

async function fetchUsers() {
  try {
    // Fetch the medicines array from the database
    const medicines = await MedicineSchema.find({});

    // Schedule cron jobs for each user's medication reminder
    medicines.forEach(async (medicine) => {
      const frequency = medicine.frequency;
      const startTime = medicine.startTime;
      const user = await UserSchema.findOne({ email: medicine.email });

      // Calculate the cron schedule based on the frequency and start time
      const cronSchedule = `${startTime.getMinutes()} ${startTime.getHours()} */${24 / frequency} * *`;

      // Create a cron job for each user's schedule
      cron.schedule(cronSchedule, () => {
        // Send the reminder to the corresponding user
        sendReminder(medicine, user);
      });
    });

    console.log("Cron jobs scheduled successfully.");
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

function sendReminder(medicine, user) {
  mailTransporter.sendMail({
    from: process.env.EMAIL,
    to: medicine.email,
    subject: `Reminder for taking daily dose for ${user.fName}`,
    text: `Daily medicine dosage reminder for ${medicine.medicineName}`,
  });
}

fetchUsers();

cron.start();
