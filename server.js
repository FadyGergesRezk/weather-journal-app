// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const app = express();
// Start up an instance of app
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

app.post("/postData", (req, res) => {
    projectData = { ...req.body };
});
app.get("/getData", (req, res) => {
    res.send(projectData);
});

// Setup Server
app.listen(port, () => {
    console.log(`server is running on localhost:${port}`);
});
