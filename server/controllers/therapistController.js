const Therapist = require("../models/Therapist");

// Add therapist (admin only)
exports.addTherapist = async (req, res) => {
  try {
    const therapist = new Therapist(req.body);
    await therapist.save();
    res.status(201).json(therapist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all therapists (public)
exports.getTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.json(therapists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
