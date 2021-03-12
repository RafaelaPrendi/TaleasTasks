// const Student = require('../models/student');

module.exports.handler =  async function(event, context) {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2))
  const response = {
      statusCode: 200, 
      body: JSON.stringify({message: "hello"}),
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
    console.log(response)

    return response
}

