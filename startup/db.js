const mongoose = require("mongoose");

const dbConnection = () => {
  const server = "localhost"; // REPLACE WITH YOUR DB SERVER
  const database = "yourCourses"; // REPLACE WITH YOUR DB NAME

  const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };

  mongoose.connect(`mongodb://${server}/${database}` , options)
    .then(() => console.log("connected the DataBase done"))
    .catch((err) => console.log(err.message));
};
exports.modules = dbConnection;

