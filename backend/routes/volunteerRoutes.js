const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");

// ✅ POST (submit form)
router.post("/", async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();

    res.status(201).json({ message: "Volunteer saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET (for testing)
router.get("/", async (req, res) => {
  try {
    const data = await Volunteer.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;