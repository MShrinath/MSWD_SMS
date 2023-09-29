const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name:String,
    subject:String,
    age:Number
})

module.exports = mongoose.model("StudentSchema", StudentSchema) 