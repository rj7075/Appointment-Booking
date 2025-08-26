const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  conditions: {
    type: [String],
    default: [],
  },
  more: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Treatment", treatmentSchema);
