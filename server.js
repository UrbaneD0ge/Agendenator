const mongoose = require('mongoose');
const express = require('express');
const app = express();
const applicationRouter = require('./routes/applications');
const Application = require('./models/applications');

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

app.set('view engine', 'ejs');

app.use('/applications', applicationRouter);

app.get('/', (req, res) => {
  res.render('index');
});

// Connecting to the database
mongoose.connect("mongodb+srv://UrbaneDoge:bPlZ8wc1DQ4cnhQC@cluster0.lojy1rw.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// run()
async function run() {
  Application.findOneAndDelete({ NPU: 'Q' }, function (err, doc) {
    if (err) return handleError(err);
    console.log(doc);
  })
}