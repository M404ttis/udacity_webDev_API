// Dependencies: body-parser
const bodyParser = require('body-parser');

// Express to run server and routes
const express = require('express');

// starting instance of express
const app = express();

// Middleware
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
// app.use(express.static('website'));

const PORT = 8080;

function listening(){
  console.log("server running 🚀"); 
  console.log(`running on 👉 http://localhost:${PORT} 👈`);
}

const server = app.listen(PORT, listening);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world');
})
