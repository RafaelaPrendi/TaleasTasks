const Student = require('../../models/student');
const Course = require('../../models/course');
const connectToDatabase = require('db.js');

module.exports.handler =  async(event, context, callback) => {
            connectToDatabase();

            try {
            let course = await Course.findById(event.pathParameters.id).populate('students', 'name');
            if (course) {
                const response = {
                  statusCode: 200, 
                  body: JSON.stringify(course),
                  headers: { 'Access-Control-Allow-Origin': '*' }
                }
            console.log(response);
            return response;

            } else {
                const response = {
                   statusCode: 404, 
                  body: JSON.stringify({ message: "Not found error" }),
                  headers: { 'Access-Control-Allow-Origin': '*' }
              }
              return response;
            }
        } catch (error) {
            console.log(error);
            const response = {
                   statusCode: 404, 
                  body: JSON.stringify({ message: "Bad Id error" }),
                  headers: { 'Access-Control-Allow-Origin': '*' }
              }
              return response;
        }

}