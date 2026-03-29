const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");

// ✅ GET all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD pet (for testing)
router.post("/", async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    await newPet.save();
    res.status(201).json({ message: "Pet added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;