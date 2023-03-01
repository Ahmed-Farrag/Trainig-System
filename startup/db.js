const mongoose = require("mongoose");
// const config = require('config');

// exports.modules= ()=>{}
const dbConnection = () => {
  const server = "localhost"; // REPLACE WITH YOUR SERVER NAME
  const database = "yourCourses"; // REPLACE WITH YOUR DB NAME

  const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };

  mongoose.connect(`mongodb://${server}/${database}` , options)
    .then(() => console.log("connected the DataBase done"))
    .catch((error) => console.log(error.message));
};
exports.modules = dbConnection;

