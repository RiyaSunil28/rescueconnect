const express = require("express");
const router = express.Router();
const path = require("path");

const Rescue = require(path.join(__dirname, "../models/Rescue"));


// ✅ GET all rescue reports
router.get("/", async (req, res) => {
  try {
    const data = await Rescue.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET single report by ID (for Track Case 🔥)
router.get("/:id", async (req, res) => {
  try {
    const report = await Rescue.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json(report);
  } catch (err) {
    console.error("GET BY ID ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ✅ CREATE rescue report (IMPORTANT FIX HERE)
router.post("/", async (req, res) => {
  try {
    const newReport = new Rescue(req.body);
    const saved = await newReport.save();

    // ✅ RETURN FULL OBJECT (for Case ID use)
    res.status(201).json(saved);

  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ✅ UPDATE status (Admin / tracking)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Rescue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json(updated);

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;