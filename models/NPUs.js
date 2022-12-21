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
  ZoomDial: { type: String, default: "+1 646-558-8656" },
  bylawsURL: String,
});

module.exports = mongoose.model("NPU", NPUSchema);