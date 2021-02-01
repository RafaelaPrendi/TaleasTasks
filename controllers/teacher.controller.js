const Teacher = require('../models/teacher');
const Course = require('../models/course');
const { models } = require('mongoose');
module.exports = {
    getAllTeachers: (req, res, next) => {
        Teacher.find({}).then(allTeachers => res.status(200).json(allTeachers))

    },
    getSingleTeacher: (req, res, next) => {
        Teacher.findById(req.params.id).then(
                teacher => {
                    if (teacher) {
                        res.status(200).json(teacher)
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
    delete: (req, res, next) => {
        Teacher.findByIdAndDelete(req.params.id).then(
            result => {
                console.log("deleted ", result)
                res.status(200).json({})
            }).catch(error => {
            console.log(error)
            res.status(500).json({ message: "Server has an error" })
        })
    },
    update: (req, res, next) => {},
    create: (req, res, next) => {},

}