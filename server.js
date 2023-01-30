const express = require("express");
const branch = require("./routes/branch");

const app = express();

require("./startup/db");


require("./startup/routes")(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`connected the port : ${PORT}`));
