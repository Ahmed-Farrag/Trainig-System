const express = require("express");
// const branch = require("./routes/branch");

const app = express();

const dbConnection = require("./startup/db")
dbConnection()
require('./startup/config');

require("./startup/routes")(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`connected the port : ${PORT}`));
