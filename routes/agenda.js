const mongoose = require('mongoose');

// define agenda route
app.get('/agenda', (req, res) => {
  res.json({ "message": "Welcome to agenda application." });
}
//
// // define database schema
const Agenda = mongoose.model('Agenda', {
  NPU: String,
  date: String,
  type: String,
  descr: String,
  adjNPU: String,
});

