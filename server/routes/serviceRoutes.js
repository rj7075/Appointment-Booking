const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new service (Admin only)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const newService = new Service({ title, description, image });
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update service (Admin only)
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE service (Admin only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
