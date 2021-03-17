const Student = require('../../models/student');
const Course = require('../../models/course');
const connectToDatabase = require('db.js');
var mongoose = require('mongoose');

module.exports.handler =  async(event, context, callback) => {
            connectToDatabase();
             try {
            console.log(event.body, "body");
            const body = JSON.parse(event.body);
             console.log(body, "body");
            console.log(body.name, "body name var");

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
          
            const newStudent = new Student({
                id: body.id,
                name: body.name,
                age: body.age,
                courses: coursesID
            });
  
            let savedStudent = await newStudent.save();
    
            for(let course of savedStudent.courses){
                let n = Course.findByIdAndUpdate(
                    {_id:course.id},
                    {$push: {students: savedStudent.id}}, 
                    {new: true}
                );
                console.log(n, "UPDATE COURSE");
            }

             let response = {
                    statusCode: 200, 
                    body: JSON.stringify(savedStudent),
                    headers: { 'Access-Control-Allow-Origin': '*' }
                }
                return response;
        } catch (error) {
            console.log(error);
            let response = {
                    statusCode: 500, 
                    body: JSON.stringify({ error: "Something went wrong" }),
                    headers: { 'Access-Control-Allow-Origin': '*' }
                
                }
                return response;
        }

            

}