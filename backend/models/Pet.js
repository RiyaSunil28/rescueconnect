const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
  type: String,     // Dog, Cat, Bird
  breed: String,
  age: Number,
  gender: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model("Pet", petSchema);