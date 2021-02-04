const Student = require('../models/student');
const Course = require('../models/course');
module.exports = {

    getAllCourses: async(req, res, next) => {
        try {
            let allCourses = await Course.find({});
            res.status(200).json(allCourses);
        } catch (error) {
            console.log(error);
        }

    },
    getSingleCourse: async(req, res, next) => {
        try {
            let course = await Course.findById(req.params.id);
            if (course) {
                res.status(200).json(course)
            } else {
                res.status(404).json({ message: "Not found error" });
            }
        } catch (error) {
            console.log(error);
            response.status(400).send({ error: 'bad id format' });
        }
    },
    delete: async(req, res, next) => {
        try {
            let result = await Course.findByIdAndDelete(req.params.id);
            console.log("deleted ", result);
            res.status(200).json({ message: "Delete was successful" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server has an error" });
        }
    },
    update: async(req, res, next) => {
        try {
            const body = req.body
            console.log("new data", body)
            if (body.name === undefined) {
                return response.status(400).json({ error: 'content missing' });
            }
            for (let studentId of body.students) {
                student = await Student.findById(studentId);
                if (!student) {
                    return res.status(404).json({ error: 'Student does not exist!' });
                }
            }
            const course = {
                name: body.name,
                description: body.description,
                hours: body.hours,
                students: body.students
            }
            let updatedCourse = await Course.findByIdAndUpdate(req.params.id, course, { new: true });
            res.status(200).json(updatedCourse);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server has an error" });
        }
    },
    create: async(req, res, next) => {
        try {
            console.log(req.body, "body");
            const body = req.body;
            if (body.name === undefined) {
                return response.status(400).json({ error: 'content missing' });
            }
            for (let studentId of body.students) {
                student = await Student.findById(studentId);
                if (!student) {
                    return res.status(404).json({ error: 'Student does not exist!' });
                }
            }
            const newCourse = new Course({
                name: body.name,
                description: body.description,
                hours: body.hours,
                students: body.students
            });
            let savedCourse = await newCourse.save();
            res.status(200).json(savedCourse);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server has an error" });
        }

    },

}