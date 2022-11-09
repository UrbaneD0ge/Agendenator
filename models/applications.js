const mongoose = require("mongoose");
const slugify = require('slugify');

const applicationSchema = new mongoose.Schema({
  NPU: String,
  date: String,
  address: String,
  type: String,
  title: String,
  descr: String,
  adjacent: String,
  createdAt: { type: Date, default: Date.now },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

applicationSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
});

module.exports = mongoose.model("Application", applicationSchema);