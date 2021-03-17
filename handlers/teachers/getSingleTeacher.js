const Course = require('../../models/course');
const Teacher = require('../../models/teacher');
const connectToDatabase = require('db.js');

module.exports.handler =  async(event, context, callback) => {
            connectToDatabase();
             try {
            let teacher = await Teacher.findById(event.pathParameters.id).populate('courses', 'name');
            if (teacher) {
               const response = {
                  statusCode: 200, 
                  body: JSON.stringify(teacher),
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