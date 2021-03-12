require('dotenv').config()
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
var cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(
    {
    origin: '*',
    credentials: true }
));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const url = "mongodb+srv://rafaela:mongoadmin@cluster0.8y8ej.mongodb.net/student-app?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const studentRoute = require('./routes/student.route');
const courseRoute = require('./routes/course.route');
const teacherRoute = require('./routes/teacher.route');
app.use('/students', studentRoute);
app.use('/courses', courseRoute);
app.use('/teachers', teacherRoute);


// const port = process.env.PORT
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })


app.get('/', async function (req, res) {
    res.json({
        result: 'Hello, World!',
    });
    return;
});


module.exports.handler = serverless(app);