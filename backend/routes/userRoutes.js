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


// ================= REGISTER =================

// Create new user
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

// 🔐 SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // ✅ VALIDATION
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // ✅ CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
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

    res.status(201).json({
      message: "Signup successful ✅"
    });

  } catch (err) {
    console.error("❌ SIGNUP ERROR:", err);

    res.status(500).json({
      message: err.message
    });
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
      return res.status(400).json({
        message: "User not found"
      });
    }

    // ✅ CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // ✅ SUCCESS RESPONSE
    res.json({
      message: "Login successful ✅",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token: "dummy-token"
    });

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);

    res.status(500).json({
      message: err.message
    });
  }
});


// ================= FORGOT PASSWORD =================

// 🔑 RESET PASSWORD
router.put("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // ✅ CHECK USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // ✅ HASH NEW PASSWORD
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // ✅ UPDATE PASSWORD
    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password updated successfully ✅"
    });

  } catch (err) {
    console.error("❌ FORGOT PASSWORD ERROR:", err);

    res.status(500).json({
      message: err.message
    });
  }
});


// ================= DELETE ACCOUNT =================

// ❌ DELETE USER ACCOUNT
router.delete("/:id", async (req, res) => {
  try {

    const deletedUser = await User.findOneAndDelete({
  email: req.params.id
});
    

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Account deleted successfully ✅"
    });

  } catch (err) {
    console.error("❌ DELETE ACCOUNT ERROR:", err);

    res.status(500).json({
      message: err.message
    });
  }
});


module.exports = router;

