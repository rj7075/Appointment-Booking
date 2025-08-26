const express = require("express");
const router = express.Router();
const Treatment = require("../models/Treatment");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// GET all treatments
router.get("/", async (req, res) => {
  try {
    const treatments = await Treatment.find();
    res.json(treatments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single treatment by ID
router.get("/:id", async (req, res) => {
  try {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment)
      return res.status(404).json({ message: "Treatment not found" });
    res.json(treatment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new treatment (Admin only)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, conditions, more, image } = req.body;
    const newTreatment = new Treatment({ title, conditions, more, image });
    await newTreatment.save();
    res.status(201).json(newTreatment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a treatment (Admin only)
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Treatment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a treatment (Admin only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Treatment.findByIdAndDelete(req.params.id);
    res.json({ message: "Treatment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
