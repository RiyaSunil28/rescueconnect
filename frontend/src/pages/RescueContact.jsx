import { useNavigate } from "react-router-dom";
import "./Rescue.css";
import { useState } from "react";
import axios from "axios";

function RescueContact() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const existing = JSON.parse(localStorage.getItem("rescueData")) || {};

      // ✅ FALLBACK FIX (VERY IMPORTANT)
      const fullData = {
        location: existing.location || "Unknown",
        animalDescription: existing.notes || "Not provided",
        animalType: existing.animalType || "Unknown",
        injuryLevel: existing.injuryLevel || "Unknown",
        image: existing.image || "",
        notes: existing.notes || "",
        name,
        phone,
        email,
        status: "pending"
      };

      console.log("Sending:", fullData);

      const res = await axios.post("http://localhost:5000/api/rescue", fullData);

const caseId = res.data._id; // backend sends id

alert(`Rescue submitted ✅\nYour Case ID: ${caseId}`);

// save for tracking
localStorage.setItem("lastCaseId", caseId);

navigate("/trackcase");
    } catch (err) {
      console.error("FULL ERROR:", err.response || err);
      alert("Error submitting ❌ Check console");
    }
  };

  return (
    <div className="rescue-container">

      <h1 className="rescue-title">Contact Information</h1>

      <div className="steps">
        <button className="step" onClick={() => navigate("/rescue")}>1 Location</button>
        <button className="step" onClick={() => navigate("/rescue-details")}>2 Details</button>
        <button className="step" onClick={() => navigate("/rescue-upload")}>3 Upload</button>
        <button className="step active">4 Contact</button>
      </div>

      <div className="rescue-content">
        <div className="form-box">

          <label>Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />

          <label>Phone</label>
          <input type="text" onChange={(e) => setPhone(e.target.value)} />

          <label>Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />

          <button className="submit-btn" onClick={handleSubmit}>
            Submit Report
          </button>

        </div>
      </div>
    </div>
  );
}

export default RescueContact;