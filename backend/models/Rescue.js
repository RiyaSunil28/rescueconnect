const mongoose = require("mongoose");

const rescueSchema = new mongoose.Schema({
  location: String,
  animalDescription: String,
  animalType: String,
  injuryLevel: String,
  image: String,
  notes: String,
  name: String,
  phone: String,
  email: String,
  trackId: {
  type: String,
  unique: true,
  default: () => Math.random().toString(36).substring(2, 12)
},
  status: { type: String, default: "pending" },

  // ✅ ADD THIS
  priority: { type: String, default: "low" }

}, { timestamps: true });

module.exports = mongoose.model("Rescue", rescueSchema);