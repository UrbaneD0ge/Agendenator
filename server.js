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
mongoose.connect("mongodb+srv://UrbaneDoge:bPlZ8wc1DQ4cnhQC@cluster0.lojy1rw.mongodb.net/?retryWrites=true&w=majority", {
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

// insert form data as a new document in the database
app.post('/form', (req, res) => {
  // create a new agenda item
  const agenda = new Agenda({
    NPU: req.body.NPU,
    date: req.body.date,
    type: req.body.type,
    descr: req.body.descr,
    adjNPU: req.body.adjNPU
  });
});

// define a simple route
app.get('/', (req, res) => {
  res.json({ "message": "AGENDENATORRR!" });
});
