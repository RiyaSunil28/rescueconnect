const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const petRoutes = require("./routes/petRoutes");
app.use("/api/pets", petRoutes);

const vetRoutes = require("./routes/vetRoutes");
app.use("/api/vets", vetRoutes);                                               

const volunteerRoutes = require("./routes/volunteerRoutes");

app.use("/api/volunteer", volunteerRoutes);

const servicesRoutes = require("./routes/services");
app.use("/api/services", servicesRoutes);

// ✅ NEW: Rescue Routes
const rescueRoutes = require("./routes/rescueRoutes");
app.use("/api/rescue", rescueRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));