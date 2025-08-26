const express = require("express");
const Therapist = require("../models/Therapist");

const router = express.Router();

// GET all therapists
router.get("/", async (req, res) => {
  const therapists = await Therapist.find();
  res.json(therapists);
});

// POST - Add a new therapist
router.post("/", async (req, res) => {
  const therapist = new Therapist(req.body);
  await therapist.save();
  res.status(201).json(therapist);
});

// PUT - Update therapist
router.put("/:id", async (req, res) => {
  const updated = await Therapist.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE - Delete therapist
router.delete("/:id", async (req, res) => {
  await Therapist.findByIdAndDelete(req.params.id);
  res.json({ message: "Therapist deleted" });
});

module.exports = router;
