const express = require("express");
require("./db.js");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const whitelist = [""]; // add our hosted frontend url later

const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
    credentials: true,
};

if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: true, credentials: true }));
} else {
    app.use(cors(corsOptions));
}

// user
app.use("/user", userRoutes);

//exercises
app.use("/exercise", exerciseRoutes);

// Covering all invalid URLs
app.get('*', (req, res) => {
    res.status(404).send('404! This is an invalid URL.');
  });

app.listen(process.env.PORT || 3001, () =>
    console.log(`Listening on port ${process.env.PORT}`)
);
