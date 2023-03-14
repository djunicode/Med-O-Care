const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database is connected!'))
    .catch((err) => console.log(err));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));