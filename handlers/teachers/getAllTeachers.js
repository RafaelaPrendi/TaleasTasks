const Student = require('../../models/student');
const Course = require('../models/course');
const Teacher = require('../models/teacher');
const connectToDatabase = require('db.js');

module.exports.handler =  async(event, context, callback) => {
            connectToDatabase();

            

}