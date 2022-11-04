const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  NPU: String,
  date: String,
  address: String,
  type: String,
  descr: String,
  adjNPU: String
});

module.exports = mongoose.model("Application", applicationSchema);