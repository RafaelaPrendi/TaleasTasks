const Student = require('../models/student');
const Course = require('../models/course');


module.exports = {

    getAllStudents: async(req, res, next) => {
        try {
            let allStudents = await Student.find({}).populate('courses', 'name');
            res.status(200).json(allStudents);
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: "Not found error" });
        }
    },

    getSingleStudent: async(req, res, next) => {
        try {
            let student = await Student.findById(req.params.id).populate('courses', 'name');
            if (student) {
                res.status(200).json(student);
            } else {
                res.status(404).json({ message: "Not found error" });
            }

        } catch (error) {
            console.log(error);
            response.status(400).send({ error: 'bad id format' });
        }
    },

    create: async(req, res, next) => {
        try {
            console.log(req.body, "body");
            const body = req.body;

            if (body.name === undefined) {
                return res.status(400).json({ error: 'content missing' });
            }

            for (let courseId of body.courses) {
                course = await Course.findById(courseId);
                if (!course) {
                    return res.status(404).json({ error: 'there is not such course!' });
                }
            }
            const newStudent = new Student({
                id: body.id,
                name: body.name,
                age: body.age,
                courses: body.courses
            });
            let savedStudent = await newStudent.save();
            console.log(savedStudent.id, "STUDENT ID")
            for(let course of savedStudent.courses){
                let n = Course.findByIdAndUpdate(
                    {id:course},
                    {$push: {students: savedStudent.id}}, 
                    {new: true}
                );
                console.log(n, "UPDATE COURSE");
            }
          
            res.status(200).json(savedStudent);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }

    },
    delete: async(req, res, next) => {
        try {
            let result = await Student.findByIdAndDelete(req.params.id);
            console.log("deleted ", result);
            res.status(200).json({});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },
    update: async(req, res, next) => {
        try {
            const body = req.body
            console.log("new data", body);
            if (body.name === undefined) {
                return res.status(400).json({ error: 'content missing' });
            }
            for (let courseId of body.courses) {
                course = await Course.findById(courseId);
                if (!course) {
                    return res.status(404).json({ error: 'there is not such course!' });
                }
            }
            const student = {
                name: body.name,
                age: body.age,
                courses: body.courses
            }
            let updatedStudent = await Student.findByIdAndUpdate(req.params.id, student, { new: true });
            res.status(200).json(updatedStudent);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

}