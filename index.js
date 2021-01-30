require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const studentRoute = require('./routes/student.route');

app.use('/students', studentRoute);


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})