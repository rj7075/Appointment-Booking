const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: Number,
  image: String,
  description: String,
});

module.exports = mongoose.model("Therapist", therapistSchema);
