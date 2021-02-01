require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const studentRoute = require('./routes/student.route');
const courseRoute = require('./routes/course.route');
const teacherRoute = require('./routes/teacher.route');

app.use('/students', studentRoute);
app.use('/courses', courseRoute);
app.use('/teachers', teacherRoute);


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
const password = process.argv[2]

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })