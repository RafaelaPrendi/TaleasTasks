const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: String,
    subject: String,
    contact: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

teacherSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);