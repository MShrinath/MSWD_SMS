const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseCode: String,
    courseName: String,
    year: Number

})

module.exports = mongoose.model("CourseSchema", CourseSchema) 