// const Student = mongoose.model('Student', studentSchema)

// const student = new Student({
//     id: 1,
//     name: "Renaldo",
//     age: 22
// })

// let allStudents = [{
//         name: "Renaldo",
//         age: 22
//     },
//     {
//         name: "Rafaela",
//         age: 22
//     },
//     {
//         name: "Ana",
//         age: 18
//     }
// ]
// Student.insertMany(allStudents, function(error, docs) {
//     if (error) {
//         console.log(error)
//     }
//     console.log('students saved!')
// });

// student.save().then(result => {
//     console.log('student saved!')
//     mongoose.connection.close()
// })
// Student.find({}).then(result => {
//     result.forEach(student => {
//         console.log(student)
//     })
//     mongoose.connection.close()
// })