const Appointment = require("../models/Appointment");

// ✅ Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const appointment = new Appointment({ ...req.body, userId: req.user.id });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get appointments for logged-in user
exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.user.id,
    }).populate("therapistId");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Admin: Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email phone") // get patient's name email and phone
      .lean(); // convert Mongoose docs to plain JS

    res.json(appointments);
  } catch (err) {
    console.error("Error in getAllAppointments:", err.message);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};
