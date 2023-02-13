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