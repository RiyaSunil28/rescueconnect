const express = require("express");
const router = express.Router();
const path = require("path");
const Service = require(path.join(__dirname, "../models/Service"));

router.get("/", async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort("order");
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;