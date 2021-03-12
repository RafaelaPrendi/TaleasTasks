const Student = require('../models/student');
const Course = require('../models/course');
const course = require('../models/course');
const { findById } = require('../models/student');

module.exports = {

    getAllCourses: async(req, res, next) => {
        try {
            let allCourses = await Course.find({}).populate('students', 'name');
            res.status(200).json(allCourses);
        } catch (error) {
            console.log(error);
        }

    },
    getSingleCourse: async(req, res, next) => {
        try {
            let course = await Course.findById(req.params.id).populate('students', 'name');
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
             console.log("deleted ", result );
            
            //  let studentResult = await Student.find({courses: {_id: req.params.id}});
            //  console.log("deleted ", studentResult );
            //update students by removing the course id
            
            res.status(200).json({ message: "Delete was successful" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
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
           
            const newCourse = new Course({
                name: body.name,
                description: body.description,
                hours: body.hours,
                students: body.students
            });
             for (let studentId of body.students) {
                student = await Student.findById(studentId);
                if (!student) {
                    return res.status(404).json({ error: 'Student does not exist!' });
                }
                try{
                    Student.findByIdAndUpdate(
                    studentId,
                    {$push: {courses: newCourse.id}},
                    {new: true}
                );
                }
                catch(error){
                    console.log(error);
                }
            }
            
            let savedCourse = await newCourse.save();
            res.status(200).json(savedCourse);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }

    },

}