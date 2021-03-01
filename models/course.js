const mongoose = require('mongoose')
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const courseSchema = new mongoose.Schema({
    name: String,
    description: String,
    hours: Number,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});
courseSchema.post('remove', document =>{
  const courseId = document._id;
  Student.find({courses: {$in: [courseId]}}).then(students =>{
        Promise.all(
            students.map(student =>
                Student.findByIdAndUpdate(
                    student._id,
                    { $pull: {courses: courseId} },
                    {new: true}
                ))
        );
  });
  Teacher.find({courses: {$in: [courseId]}}).then(teachers =>{
      Promise.all(
          teachers.map(teacher =>
            Teacher.findByIdAndUpdate(
                teacher._id,
                {$pull: {courses: courseId}},
                {new: true}
            ))
      );
  });
});

// courseSchema.post('save', document =>{
//   const courseId = document._id;
//   Student.find({courses: {$in: [courseId]}}).then(students =>{
//         Promise.all(
//             students.map(student =>
//                 Student.findByIdAndUpdate(
//                     student._id,
//                     { $push: {courses: courseId} },
//                     {new: true}
//                 ))
//         );
//   });
//   Teacher.find({courses: {$in: [courseId]}}).then(teachers =>{
//       Promise.all(
//           teachers.map(teacher =>
//             Teacher.findByIdAndUpdate(
//                 teacher._id,
//                 {$push: {courses: courseId}},
//                 {new: true}
//             ))
//       );
//   });
// });
courseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Course', courseSchema);