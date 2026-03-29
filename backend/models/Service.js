const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: String,
  slug: String,
  route: String,
  description: String,
  icon: String,
  isActive: Boolean,
  order: Number
});

module.exports = mongoose.model("Service", ServiceSchema);