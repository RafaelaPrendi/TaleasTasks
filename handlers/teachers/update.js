const Course = require('../../models/course');
const Teacher = require('../../models/teacher');
const connectToDatabase = require('db.js');
var mongoose = require('mongoose');

module.exports.handler =  async(event, context, callback) => {
            connectToDatabase();
            try{
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
                  for (let obj of body.courses) {
                      console.log(obj, "OBJECT");
                      var id = mongoose.Types.ObjectId(obj.id);
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
             const teacher = {
                name: body.name,
                subject: body.subject,
                contact: body.contact,
                courses: coursesID
            }
            let updatedTeacher = await Teacher.findByIdAndUpdate(event.pathParameters.id, teacher, { new: true });
            for (let course of updatedTeacher.courses) {
                let n = Course.findByIdAndUpdate(
                    {_id:course.id},
                    {$push: {students: savedStudent.id}}, 
                    {new: true}
                );
                console.log(n, "UPDATE COURSE");
            }
             let response = {
                    statusCode: 200, 
                    body: JSON.stringify(updatedTeacher),
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
            

