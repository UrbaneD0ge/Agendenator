const express = require('express');
const mongoose = require('mongoose');
const app = express();
const applicationRouter = require('./routes/applications');
const Application = require('./models/applications');
const methodOverride = require('method-override');

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const applications = await Application.find().sort({ createdAt: 'desc' });
  res.render('index', { applications: applications });
});

// Connecting to the database
mongoose.connect("mongodb+srv://UrbaneDoge:bPlZ8wc1DQ4cnhQC@cluster0.lojy1rw.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// run()
async function run() {
  Application.find({ NPU: 'Q' }, function (err, doc) {
    if (err) return handleError(err);
    Object.keys(doc).forEach(function (key) {
      var val = doc[key];
      console.log(val);
    });
  });
}

app.use('/applications', applicationRouter);