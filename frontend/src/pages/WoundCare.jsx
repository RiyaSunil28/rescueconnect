import React from "react";
import { useNavigate } from "react-router-dom";
import "./MedicalHelp.css";

function WoundCare() {
  const navigate = useNavigate();

  return (
    <div className="detail-container">

      {/* Header */}
      <div className="detail-hero">
        <h1>🩹 Wound Care</h1>
      </div>

      {/* Content */}

      <div className="detail-content">

        <button className="back-btn" onClick={() => navigate("/medical-help")}>
          ← Back
        </button>
        <button
        style={{ background: "red", color: "white", marginBottom: "10px" }}
        onClick={() => navigate("/rescue")}
>
       🚑 Emergency Help
        </button>

        <p>Proper wound care is essential to prevent infection.</p>

        <h2>🔍 Step 1: Assess the Injury</h2>
        <p>Check for bleeding or deep cuts.</p>

        <h2>🧼 Step 2: Clean the Wound</h2>
        <p>Use clean water to remove dirt.</p>

        <h2>🧴 Step 3: Apply Antiseptic</h2>
        <p>Use mild antiseptic to avoid infection.</p>

        <h2>🩹 Step 4: Bandage</h2>
        <p>Cover with a clean bandage.</p>

      </div>
    </div>
  );
}

export default WoundCare;