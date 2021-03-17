const Student = require('../../models/student');
const Course = require('../../models/course');
const connectToDatabase = require('db.js');

module.exports.handler =  async(event, context, callback) => {
            connectToDatabase();
             try {
            let allCourses = await Course.find({}).populate('students', 'name');
             const response = {
                  statusCode: 200, 
                  body: JSON.stringify(allCourses),
                  headers: { 'Access-Control-Allow-Origin': '*' }
                }
            console.log(response);

            return response;
        } catch (error) {
            console.log(error);
              const response = {
                   statusCode: 404, 
                  body: JSON.stringify({ message: "Not found error" }),
                  headers: { 'Access-Control-Allow-Origin': '*' }
              }
              return response;
        }
            

}