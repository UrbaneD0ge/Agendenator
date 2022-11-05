const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  NPU: String,
  date: String,
  address: String,
  type: String,
  title: String,
  descr: String,
  adjNPU: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema);