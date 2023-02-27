/* Empty JS object to act as endpoint for all routes */
projectData = [];

/* Express to run server and routes */
const express = require("express");

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static("website"));

const port = 8080;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost:${port}`);
}

// GET route
app.get("/allData", sendData);

function sendData(request, response) {
  console.log(projectData);
  response.send(projectData);
}

// POST route
app.post("/add", addPostCallback);

function addPostCallback(req, res) {
  let newData = req.body;
  let newEntry = {
    date: newData.date,
    temp: newData.temp,
    content: newData.content,
  };
  projectData.push(newEntry);
}
