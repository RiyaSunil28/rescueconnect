const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");

const User = require(path.join(__dirname, "../models/User"));


// ================= EXISTING CODE (UNCHANGED) =================

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("GET USERS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// Create new user (existing)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword 
    });

    const savedUser = await newUser.save();
    res.json(savedUser);

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(400).json({ message: err.message });
  }
});


// ================= FIXED SIGNUP =================

// 🔐 SIGNUP (clean + safe)
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // ✅ VALIDATION (FIX)
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ CHECK EXISTING USER
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ CREATE USER
    const newUser = new User({
      name: fullName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful ✅" });

  } catch (err) {
    console.error("❌ SIGNUP ERROR:", err); // VERY IMPORTANT
    res.status(500).json({ message: err.message });
  }
});


// ================= LOGIN =================

// 🔑 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ CHECK USER
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful ✅" });

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;


