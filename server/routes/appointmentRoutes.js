const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Appointment = require("../models/Appointment");
const {
  bookAppointment,
  getUserAppointments,
  getAllAppointments, // ✅ Import this
} = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/book", authMiddleware.verifyToken, bookAppointment);
router.get("/my", authMiddleware.verifyToken, getUserAppointments);

// ✅ Add this route for admin to get all appointments
router.get("/", getAllAppointments);

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid appointment ID" });
  }

  try {
    const result = await Appointment.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error("Error deleting appointment:", err); // Log full error
    res.status(500).json({ message: "Failed to delete appointment" });
  }
});

module.exports = router;
