import React from "react";
import { useNavigate } from "react-router-dom";
import "./MedicalHelp.css";

function EmergencySigns() {
  const navigate = useNavigate();

  return (
    <div className="detail-container">

      <div className="detail-hero">
        <h1>🚨 Emergency Signs</h1>
      </div>

      <div className="detail-content">

        <button className="back-btn" onClick={() => navigate("/medical-help")}>
        ← Back
       </button>
       <button
  style={{ background: "red", color: "white", marginBottom: "10px" }}
  onClick={() => navigate("/rescue")}
>
  🚑 Emergency Rescue
</button>

        <p>Recognizing emergency signs can save lives.</p>

        <h2>⚠️ Critical Signs</h2>
        <ul>
          <li>Breathing difficulty</li>
          <li>Unconsciousness</li>
          <li>Severe bleeding</li>
          <li>Seizures</li>
        </ul>

        <h2>⏱️ What to Do</h2>
        <p>Act quickly and contact emergency veterinary services.</p>

      </div>
    </div>
  );
}

export default EmergencySigns;