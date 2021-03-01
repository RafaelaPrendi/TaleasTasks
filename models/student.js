const mongoose = require('mongoose')
const Course = require('../models/course');
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
})
studentSchema.post('remove', document =>{
    const studentId = document._id;
    Course.find({students: {$in: [studentId]}}).then(courses =>{
        Promise.all(
            courses.map(course =>
                Course.findByIdAndUpdate(
                    course._id,
                    { $pull: {students: studentId}},
                    {new: true}
                ))
            );

    });
});
// test it
// studentSchema.post('save', document =>{
//     const studentId = document._id;
//     const studentCourses = document.courses; 
//     studentCourses.map(course =>
//         {
//                  Course.findByIdAndUpdate(
//                  course._id,
//                 { $push: {students: studentId}},
//                 {new: true}
//             );
           
//         });
// });
studentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Student', studentSchema)