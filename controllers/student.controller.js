const Student = require('../models/student');

module.exports = {

    getAllStudents: (req, res, next) => {
        Student.find({}).then(allStudents => res.status(200).json(allStudents))
    },

    getSingleStudent: (req, res, next) => {
        Student.findById(req.params.id).then(
                student => {
                    if (student) {
                        res.status(200).json(student)
                    } else {
                        res.status(404).json({ message: "Not found error" })
                    }
                }
            )
            .catch(error => {
                console.log(error)
                response.status(400).send({ error: 'bad id format' })
            })
    },

    create: (req, res, next) => {
        console.log(req.body, "body");
        const body = req.body;

        if (body.name === undefined) {
            return response.status(400).json({ error: 'content missing' });
        }
        const newStudent = new Student({
            id: body.id,
            name: body.name,
            age: body.age,
        });
        newStudent.save().then(savedStudent => {
            res.status(200).json(savedStudent)
        });

    },
    delete: (req, res, next) => {
        Student.findByIdAndDelete(req.params.id).then(
            result => {
                console.log("deleted ", result)
                res.status(200).json({})
            }).catch(error => {
            console.log(error)
            res.status(500).json({ message: "Server has an error" })
        })
    },
    update: (req, res, next) => {
        const body = req.body
        console.log("new data", body)
        const student = {
            name: body.name,
            age: body.age,
        }

        Student.findByIdAndUpdate(req.params.id, student, { new: true })
            .then(updatedStudent => {
                res.json(updatedStudent)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ message: "Server has an error" })
            })
    },

}