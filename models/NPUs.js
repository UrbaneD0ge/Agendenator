const mongoose = require("mongoose");

const NPUSchema = new mongoose.Schema({
  NPU: String,
  chair: String,
  chairE: String,
  planner: String,
  plannerE: String,
  meeting: String,
  ZoomID: String,
  ZoomPW: String,
  ZoomURL: String,
  bylawsURL: String,
  isHybrid: Boolean,
  location: String,
  nhoods: Array,
  isHybrid: Boolean
});

module.exports = mongoose.model("NPU", NPUSchema);