const express = require('express');
const router = express.Router();
const Courses = require('../Models/courses');
const csvtojson=require('csvtojson');
const multer = require('multer');


router.post("/", async (req, res) => {
    try {
        const course = new Courses(req.body)
        await course.save();
        res.status(200).json(course)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get("/", async (req, res) => {
    try {
        const course = await Courses.find();
        res.status(200).json(course)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

async function getCourses(req, res, next) {
    let course;
    try {
        course = await Courses.findById(req.params.id);
        if (course == null) {
            return res.status(404).json({ message: "Record not found" })
        }
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
    res.course = course;
    next();
}

router.get('/:id', getCourses, async (req, res) => {
    res.json(res.course)
})

router.delete('/:id', getCourses, async (req, res) => {
    try {
        await res.course.deleteOne();
        res.json({ message: "Course is successfully deleted" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.put('/:id', getCourses, async (req, res) => {
    if (req.body.coursecode != null) {
        res.course.coursecode = req.body.coursecode;
    }
    if (req.body.coursename != null) {
        res.course.coursename = req.body.coursename;
    }
    if (req.body.year != null) {
        res.course.year = req.body.year;
    }

    try {
        const updatedCourse = await res.course.save();
        res.json(updatedCourse)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

const storage = multer.memoryStorage();
const upload = multer({ storag: storage.storag })
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(404).json("No file uploaded")
    }
    try {
        const jsnarry = await csvtojson().fromString(req.file.buffer.toString())
        await Courses.insertMany(jsnarry);
        res.status(200).json("File Uploaded Successfully")
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;