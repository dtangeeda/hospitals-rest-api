global.__basedir = __dirname;
require("dotenv/config");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
const { createRoutes } = require("./router");

createRoutes(app);
console.log("Loading the server.js file for the REST API");

//Start Server for REST API
app.listen(PORT, () => console.log(`REST Server has started on port ${PORT}`));
module.exports = app;
