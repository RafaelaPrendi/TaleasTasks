const Student = require('../../models/student');
const Course = require('../../models/course');
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
             let studentsID = []
             if(body.students){
                for (let student of body.students) {
                    var id = mongoose.Types.ObjectId(student.id);
                    studentsID.push(id);
                student = await Student.findById(id);
                if (!student) {
                    return res.status(404).json({ error: 'Student does not exist!' });
                }
            }
             }
             const newCourse = new Course({
                id: body.id,
                name: body.name,
                description: body.description,
                hours: body.hours,
                students: studentsID
            });
            let savedCourse = await newCourse.save();

            for(let student of savedCourse.students){
                Student.findByIdAndUpdate(
                    {_id: student.id},
                    {$push: {courses: savedCourse.id}},
                    {new: true}
                );
                }

               let response = {
                    statusCode: 200, 
                    body: JSON.stringify(savedCourse),
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