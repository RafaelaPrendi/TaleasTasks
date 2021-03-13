const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

let isConnected;
const url = "mongodb+srv://rafaela:mongoadmin@cluster0.8y8ej.mongodb.net/student-app?retryWrites=true&w=majority";

module.exports = connectToDatabase = () => {
  if(isConnected){
     console.log('=> using existing database connection');
    return Promise.resolve();
  }
  else{
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
      isConnected = result.connections[0].readyState;
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
  }
  
}

