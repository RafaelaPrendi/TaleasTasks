const Student = require('../../models/student');
const connectToDatabase = require('db.js');

module.exports.handler =  async(event, context, callback) => {
            connectToDatabase();
            try{
                let student = await Student.findById(event.pathParameters.id).populate('courses', 'name');
                if(student){
                    const response = {
                    statusCode: 200, 
                    body: JSON.stringify(student),
                    headers: { 'Access-Control-Allow-Origin': '*' }
                    }
            console.log(response)

            return response;
                }
                else{
                    console.log(error);
                    const response = {
                    statusCode: 404, 
                     body: JSON.stringify({ message: "Not found error" }),
                    headers: { 'Access-Control-Allow-Origin': '*' }
              }
              return response;
                }
            }
            catch(error){
                console.log(error);
              const response = {
                   statusCode: 400, 
                  body: JSON.stringify({ message: "bad id format" }),
                  headers: { 'Access-Control-Allow-Origin': '*' }
              }
              return response;
            }
            

}