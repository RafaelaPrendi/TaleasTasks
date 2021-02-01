const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: String,
    description: String,
    hours: Number,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});
courseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Course', courseSchema);