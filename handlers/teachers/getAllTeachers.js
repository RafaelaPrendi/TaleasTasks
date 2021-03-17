const Course = require('../../models/course');
const Teacher = require('../../models/teacher');
const connectToDatabase = require('db.js');

module.exports.handler =  async(event, context, callback) => {
            connectToDatabase();
              try {
            let allTeachers = await Teacher.find({}).populate('courses', 'name');
            const response = {
                  statusCode: 200, 
                  body: JSON.stringify(allTeachers),
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