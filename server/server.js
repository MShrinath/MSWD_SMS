const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require('dotenv').config()
const courseRoute = require("./Routers/courseroute")
const facultyRoute = require("./Routers/facultyroute")
const studentRoute = require("./Routers/studentroute")

const port = process.env.PORT
const app = express()
app.use(bodyParser.json())
app.use(cors())

const db = require("./db")

app.use('/api/course', courseRoute)
app.use('/api/faculty',facultyRoute)
app.use('/api/student',studentRoute)

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.listen(port,()=>{
    console.log("Server is running on port",port);
})
