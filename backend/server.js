const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection
connection.once("open", () => {
    console.log("MongoDB database established succesfully")
})

const excercisesRouter = require("./routes/exercises")
const usersRouter = require("./routes/users")

app.use("/exercises", excercisesRouter)
app.use("/users", usersRouter)

app.get("/", (req, res) => {
    res.send("Hallo Marco, aka CEO of the World")
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})