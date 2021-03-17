const Student = require('../../models/student');
const Course = require('../../models/course');
const connectToDatabase = require('db.js');
var mongoose = require('mongoose');

module.exports.handler =  async(event, context, callback) => {
            connectToDatabase();
              try {
            const body = JSON.parse(event.body);

            if (body.name === undefined) {
                let response = {
                    statusCode: 400, 
                  body: JSON.stringify({ error: 'content body missing' }),
                  headers: { 'Access-Control-Allow-Origin': '*' }
                
                }
                return response;
            }
            let coursesID = []
            if(body.courses){
                  for (let course of body.courses) {
                      console.log(course, "OBJECT");
                      var id = mongoose.Types.ObjectId(course.id);
                    coursesID.push(id);
                    course =  Course.findOne({_id: id});
                    if (!course) {
                        let response = {
                            statusCode: 400, 
                            body: JSON.stringify({ error: 'content course missing' }),
                            headers: { 'Access-Control-Allow-Origin': '*' }
                        }
                    return response;
                    }
                }
            }
            const student = {
                name: body.name,
                age: body.age,
                courses: coursesID
            };
            let updatedStudent = await Student.findByIdAndUpdate(event.pathParameters.id, student, { new: true });
            let response = {
                    statusCode: 200, 
                    body: JSON.stringify(updatedStudent),
                    headers: { 'Access-Control-Allow-Origin': '*' }
                }
                return response;
        
        }
        catch(error){
            console.log(error);
            let response = {
                    statusCode: 500, 
                    body: JSON.stringify({ error: "Something went wrong" }),
                    headers: { 'Access-Control-Allow-Origin': '*' }
                
                }
                return response;
        }
            

}