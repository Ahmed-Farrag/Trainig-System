const express = require("express");
const app = express();
const d = require("./startup/config");

require("./startup/db");
require("./startup/routes");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`connected the port : ${PORT}`));
