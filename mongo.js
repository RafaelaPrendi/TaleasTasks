const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://rafaela:${password}@cluster0.8y8ej.mongodb.net/student-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const studentSchema = new mongoose.Schema({
    id: Number,
    name: String,
    age: Number
})

const Student = mongoose.model('Student', studentSchema)

const student = new Student({
    id: 1,
    name: "Renaldo",
    age: 22
})

let allStudents = [{
        name: "Renaldo",
        age: 22
    },
    {
        name: "Rafaela",
        age: 22
    },
    {
        name: "Ana",
        age: 18
    }
]
Student.insertMany(allStudents, function(error, docs) {
    if (error) {
        console.log(error)
    }
    console.log('students saved!')
});

// student.save().then(result => {
//     console.log('student saved!')
//     mongoose.connection.close()
// })
Student.find({}).then(result => {
    result.forEach(student => {
        console.log(student)
    })
    mongoose.connection.close()
})