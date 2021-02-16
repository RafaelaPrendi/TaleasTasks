const Teacher = require('../models/teacher');
const Course = require('../models/course');
const { models } = require('mongoose');
module.exports = {
    getAllTeachers: async(req, res, next) => {
        try {
            let allTeachers = await Teacher.find({}).populate('courses', 'name');
            res.status(200).json(allTeachers);
        } catch (error) {
            console.log(error);
        }

    },
    getSingleTeacher: async(req, res, next) => {
        try {
            let teacher = await Teacher.findById(req.params.id).populate('courses', 'name');
            if (teacher) {
                res.status(200).json(teacher)
            } else {
                res.status(404).json({ message: "Not found error" })
            }
        } catch (error) {
            console.log(error);
            response.status(400).send({ error: 'bad id format' });
        }

    },
    delete: async(req, res, next) => {
        try {
            let result = await Teacher.findByIdAndDelete(req.params.id);
            console.log("deleted ", result);
            res.status(200).json({});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },
    create: async(req, res, next) => {
        try {
            console.log(req.body, "body");
            const body = req.body;
            if (body.name === undefined) {
                return response.status(400).json({ error: 'content missing' });
            }
            for (let courseId of body.courses) {
                course = await Course.findById(courseId);
                if (!course) {
                    return res.status(404).json({ error: 'there is not such course!' });
                }
            }
            const newTeacher = new Teacher({
                name: body.name,
                subject: body.subject,
                contact: body.contact,
                courses: body.courses
            });
            let savedTeacher = await newTeacher.save();
            res.status(200).json(savedTeacher)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'error while saving data' });
        }
    },
    update: async(req, res, next) => {
        try {
            const body = req.body
            console.log("new data", body);
            const teacher = {
                name: body.name,
                subject: body.subject,
                contact: body.contact,
                courses: body.courses
            }
            for (let courseId of body.courses) {
                course = await Course.findById(courseId);
                if (!course) {
                    return res.status(404).json({ error: 'there is not such course!' });
                }
            }
            let updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, teacher, { new: true });
            res.status(200).json(updatedTeacher);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

}