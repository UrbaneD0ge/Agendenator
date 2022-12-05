const express = require('express');
const mongoose = require('mongoose');
const app = express();
const applicationRouter = require('./routes/applications');
const NPUrouter = require('./routes/NPUs');
const Application = require('./models/applications');
const NPU = require('./models/NPUs');
const methodOverride = require('method-override');

app.listen(3000 || process.env.PORT, () => {
  console.log('Listening at http://localhost:3000');
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  res.render('index');
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

app.use('/agenda', applicationRouter);
app.use('/show', applicationRouter);
app.use('/edit', applicationRouter);
app.use('/desc', applicationRouter);
app.use('/agenda', applicationRouter);
app.use('/NPUs', NPUrouter);
app.use('/NPUs/new', NPUrouter);
app.use('/:id', applicationRouter);
