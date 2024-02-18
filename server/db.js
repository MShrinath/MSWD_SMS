const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.MONGODB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

module.exports = db;