const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: String,
  name: String,
  email: String,
  image: String,
  token: String,
});