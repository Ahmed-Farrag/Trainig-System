const mongoose = require("mongoose");
// const config = require('../config/db.json');
const config = require('config');

// module.exports= ()=>{}   => in server.js  : require("./startup/db")()
const dbConnection = () => {
  // const server = "localhost"; // REPLACE WITH YOUR SERVER NAME
  // const database = "yourCourses"; // REPLACE WITH YOUR DB NAME
  const server = config.get('Server.host');
  const database = config.get('Server.database');
  // const options = {
  //   useCreateIndex: true,
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: false
  // };

  mongoose.connect(`mongodb://${server}/${database}` )
    .then(() => console.log("connected the DataBase done"))
    .catch((error) => console.log(error.message));
};
module.exports = dbConnection;

