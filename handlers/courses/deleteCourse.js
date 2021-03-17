const Student = require('../../models/student');
const Course = require('../../models/course');
const connectToDatabase = require('db.js');


module.exports.handler =  async(event, context, callback) => {
            connectToDatabase();
              try {
            let result = await Course.findByIdAndDelete(event.pathParameters.id);
             const response = {
                  statusCode: 200, 
                  body: JSON.stringify(result),
                  headers: { 'Access-Control-Allow-Origin': '*' }
                }
            console.log(response);
            return response;
        } catch (error) {
              console.log(error);
            const response = {
                   statusCode: 500, 
                  body: JSON.stringify({ message: "Error" }),
                  headers: { 'Access-Control-Allow-Origin': '*' }
              }
              return response;
        }
            

}