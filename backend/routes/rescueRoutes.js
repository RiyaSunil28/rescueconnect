const express = require("express");
const router = express.Router();
const path = require("path");
const Rescue = require("../models/Rescue");


// MUST EXIST
router.get("/", async (req, res) => {
  const data = await Rescue.find();
  res.json(data);
});

// TRACK ROUTE
router.get("/:trackId", async (req, res) => {
  const report = await Rescue.findOne({ trackId: req.params.trackId });

  if (!report) {
    return res.status(404).json({ message: "Case not found" });
  }

  res.json(report);
});




router.post("/", async (req, res) => {
  try {
    const newReport = new Rescue({
      ...req.body,
      trackId: Math.random().toString(36).substring(2, 12)
    });

    const saved = await newReport.save();
    res.status(201).json(saved);

  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/:trackId", async (req, res) => {
  try {
    const updated = await Rescue.findOneAndUpdate(
      { trackId: req.params.trackId },
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;