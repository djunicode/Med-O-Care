const express = require("express")
require("./db.js")
require('dotenv').config()
const cors = require("cors")
const bodyParser = require("body-parser")

const userRoutes = require("./routes/userRoutes")
const exerciseRoutes = require("./routes/exerciseRoutes")

const app = express()
app.use(bodyParser.json());
app.use(cors())
app.use(express.json())

// user 
app.use('/user',userRoutes)

//exercises
app.use("/exercise", exerciseRoutes)


app.listen(process.env.PORT || 3001, () => console.log(`Listening on port 3001`))
