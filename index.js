require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { request, response } = require('express');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// const Student = require('./models/student')

// mongo db
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]


const url =
    `mongodb+srv://rafaela:${password}@cluster0.8y8ej.mongodb.net/student-app?retryWrites=true&w=majority`

// cons url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const studentSchema = new mongoose.Schema({
    id: Number,
    name: String,
    age: Number
})
studentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Student = mongoose.model('Student', studentSchema)
    // module.exports = mongoose.model('Student', studentSchema)


app.get('/', (request, response) => {
    console.log("Hello World")
    response.send('<h1>Hello World!</h1>')
})

app.get('/students/:id', (req, res, next) => {
    Student.findById(req.params.id).then(
            student => {
                if (student) {
                    res.status(200).json(student)
                } else {
                    res.status(404).end()
                }
            })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'bad id format' })
        })
})

app.get('/students', (req, res, next) => {
    Student.find({}).then(allStudents => {
        res.status(200).json(allStudents)
    })
})

app.post('/students', (req, res, next) => {
    console.log(req.body, "Body")
    const body = req.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const newStudent = new Student({
        id: body.id,
        name: body.name,
        age: body.age,
    })
    newStudent.save().then(savedStudent => {
        res.status(200).json(savedStudent)
    })

})

app.delete('/students/:id', (req, res, next) => {
    Student.findByIdAndDelete(req.params.id).then(
        result => {
            console.log("deleted ", result)
            res.status(204).end()
        }).catch(error => {
        console.log(error)
        res.status(500).end()
    })
})

//body undefined error to fix
app.put('/students/:id', (req, res, next) => {
    const body = request.body
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
            res.status(500).end()
        })
})


// const port = process.env.PORT
const port = 5000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})