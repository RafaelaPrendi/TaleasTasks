require('dotenv').config()
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const studentRoute = require('./routes/student.route');
const courseRoute = require('./routes/course.route');
const teacherRoute = require('./routes/teacher.route');

app.use('/students', studentRoute);
app.use('/courses', courseRoute);
app.use('/teachers', teacherRoute);


// if (process.argv.length < 3) {
//     console.log('Please provide the password as an argument: node mongo.js <password>')
//     process.exit(1)
// }
// const password = process.argv[2]

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.get('/hello', async function (req, res) {
    res.json({
        result: 'Hello, World!',
    });
    return;
});


module.exports.handler = serverless(app);