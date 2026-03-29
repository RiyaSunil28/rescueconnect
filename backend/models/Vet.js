const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema({
  name: String,
  city: String,
  location: String,
  lat: Number,
  lng: Number,
  phone: String
});

module.exports = mongoose.model("Vet", vetSchema);