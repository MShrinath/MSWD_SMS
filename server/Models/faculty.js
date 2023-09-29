const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    facultyName:String,
    facutlyID:Number,
    facultyDept:String,
    qualification:String,
    designation:String,
    email:String,
    password:String
})

module.exports = mongoose.model("FacultySchema", FacultySchema) 