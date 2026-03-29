const express = require("express");
const router = express.Router();
const Vet = require("../models/Vet");

// ✅ GET vets by city
router.get("/", async (req, res) => {
  const { city } = req.query;

  try {
    let vets;

    if (city) {
      vets = await Vet.find({ city: new RegExp(city, "i") });
    } else {
      vets = await Vet.find();
    }

    res.json(vets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;