const Treatment = require("../models/Treatment");

exports.addTreatment = async (req, res) => {
  try {
    const treatment = new Treatment(req.body);
    await treatment.save();
    res.status(201).json(treatment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find();
    res.json(treatments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
