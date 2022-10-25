// Server code!
// import express
const express = require('express');
// import body-parser
const bodyParser = require('body-parser');
// import mongoose
const mongoose = require('mongoose');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
// const dbConfig = require('./');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// define a simple route
app.get('/', (req, res) => {
  res.json({ "message": "AGENDENATORRR!" });
});

