const express = require('express');
const router = express.Router();
const Faculty = require('../Models/faculty');

router.post('/', async (req, res) => {
    try {
        const faculty = new Faculty(req.body)
        await faculty.save();
        res.status(201).json(faculty);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get("/", async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(201).json(faculties)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


async function getFaculty(req, res, next) {
    let faculty;
    try {
        faculty = await Faculty.findById(req.params.id);
        if (faculty == null) {
            return res.status(404).json({ message: "Record not found" })
        }
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
    res.faculty = faculty;
    next();
}

router.delete('/:id', getFaculty, async (req, res) => {
    try {
        await res.faculty.deleteOne();
        const id = req.params.id;
        await res.faculty.deleteOne({ _id: id });
        res.json({ message: "Faculty is successfully deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getFaculty, async (req, res) => {
    res.json(res.faculty)
})

router.patch('/:id', getFaculty, async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        faculty.designation = req.body.designation;
        faculty.qualification = req.body.qualification;
        faculty.email = req.body.email;
        const newfaculty = await faculty.save()
        res.status(201).json(newfaculty)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;