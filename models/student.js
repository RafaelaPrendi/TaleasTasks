const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
})
studentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Student', studentSchema)