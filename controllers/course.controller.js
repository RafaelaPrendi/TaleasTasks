const Student = require('../models/student');
const Course = require('../models/course');
module.exports = {

    getAllCourses: (req, res, next) => {
        Course.find({}).then(allCourses => res.status(200).json(allCourses))

    },
    getSingleCourse: (req, res, next) => {
        Course.findById(req.params.id).then(
                course => {
                    if (course) {
                        res.status(200).json(course)
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
        Course.findByIdAndDelete(req.params.id).then(
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