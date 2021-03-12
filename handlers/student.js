const { json } = require('body-parser');
const Student = require('../models/student');


// module.exports.getAllStudents = async(event, context, callback) => {
//         context.callbackWaitsForEmptyEventLoop = false;

//         try {
//             let allStudents = await Student.find({}).populate('courses', 'name');
//             callback(null, {
//                 statusCode: 200,
//                 body: json(allStudents)
//             });
//             event.status(200).json(allStudents);
//         } catch (error) {
//             // console.log(error);
//             event.status(404).json({ message: "Not found error" });
//             callback(null, {
//                 statusCode: err.statusCode || 500,
//                 headers: { 'Content-Type': 'text/plain' },
//                 body: 'Could not fetch the students.'
//             });
//         }
//     };

module.exports.getAllStudents =  async function(event, context) {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2))
  return context.logStreamName
}