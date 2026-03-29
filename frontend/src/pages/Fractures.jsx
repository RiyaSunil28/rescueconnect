import React from "react";
import { useNavigate } from "react-router-dom";
import "./MedicalHelp.css";

function Fractures() {
  const navigate = useNavigate();

  return (
    <div className="detail-container">

      <div className="detail-hero">
        <h1>🐾 Fractures</h1>
      </div>

      <div className="detail-content">

        <button className="back-btn" onClick={() => navigate("/medical-help")}>
        ← Back
        </button>
        <button
  style={{ background: "red", color: "white", marginBottom: "10px" }}
  onClick={() => navigate("/rescue")}
>
  🚑 Report Emergency
</button>
        <p>Fractures need immediate care.</p>

        <h2>🛑 Step 1: Restrict Movement</h2>
        <p>Keep the animal still.</p>

        <h2>🪵 Step 2: Support Limb</h2>
        <p>Use a splint carefully.</p>

        <h2>🚗 Step 3: Transport Safely</h2>
        <p>Take to a vet immediately.</p>

        <h2>⚠️ Signs</h2>
        <ul>
          <li>Swelling</li>
          <li>Pain</li>
          <li>Cannot walk</li>
        </ul>

      </div>
    </div>
  );
}

export default Fractures;