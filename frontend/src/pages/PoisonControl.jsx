import React from "react";
import { useNavigate } from "react-router-dom";
import "./MedicalHelp.css";

function PoisonControl() {
  const navigate = useNavigate();

  return (
    <div className="detail-container">

      <div className="detail-hero">
        <h1>⚠️ Poison Control</h1>
      </div>

      <div className="detail-content">

        <button className="back-btn" onClick={() => navigate("/medical-help")}>
        ← Back
       </button>
     <button
      style={{ background: "red", color: "white", marginBottom: "10px" }}
         onClick={() => navigate("/rescue")}
>
       🚑 Immediate Help
        </button>
        <p>Poisoning can be life-threatening. Act quickly.</p>

        <h2>🚨 Step 1: Identify Poison</h2>
        <p>Check what the animal consumed.</p>

        <h2>📞 Step 2: Call a Vet</h2>
        <p>Contact veterinary help immediately.</p>

        <h2>🚫 Step 3: Do NOT Induce Vomiting</h2>
        <p>Only do so if advised by a professional.</p>

        <h2>💧 Step 4: Keep Animal Calm</h2>
        <p>Provide a safe and quiet space.</p>

      </div>
    </div>
  );
}

export default PoisonControl;