const Student = require('../../models/student');
const connectToDatabase = require('db.js');



module.exports.handler = async(event, context, callback) => {
            connectToDatabase();   
            try{
              let allStudents = await Student.find({}).populate('courses', 'name');
              const response = {
                  statusCode: 200, 
                  body: JSON.stringify(allStudents),
                  headers: { 'Access-Control-Allow-Origin': '*' }
                }
            console.log(response)

            return response
            }
            catch(error){
              console.log(error);
              const response = {
                   statusCode: 404, 
                  body: JSON.stringify({ message: "Not found error" }),
                  headers: { 'Access-Control-Allow-Origin': '*' }
              }
              return response;
            }
              }