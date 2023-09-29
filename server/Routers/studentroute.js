const express = require('express');
const router = express.Router();
const Student = require('../Models/student');
const csvtojson=require('csvtojson');
const multer = require('multer');


router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(201).json(students)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const students = new Student(req.body)
        await students.save();
        res.status(201).json(students);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

async function getStudent(req, res, next) {
    let student;
    try {
        student = await Student.findById(req.params.id);
        if (student == null) {
            return res.status(404).json({ message: "Record not found" })
        }
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
    res.student = student;
    next();
}

router.get('/:id', getStudent, async (req, res) => {
    res.json(res.student)
})

router.put(':/id', getStudent, async (req, res) => {
    if (req.body.name != null)
        res.student.name = req.body.name;

    if (req.body.subject != null)
        res.student.subject = req.body.subject;

    if (req.body.age != null)
        res.student.age = req.body.age;

    try {
        const updatedData = await res.student.save()
        res.json(updatedData);
    } catch (error) {
        return res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getStudent, async (req, res) => {
    try {
        await res.student.deleteOne();
        res.json({ message: "Student is successfully deleted" })
    } catch (error) {
        return res.status(400).json({ message: err.message })
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
        await Student.insertMany(jsnarry);
        res.status(200).json("File Uploaded Successfully")
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;