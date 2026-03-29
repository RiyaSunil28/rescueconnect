import { useNavigate } from "react-router-dom";
import "./Rescue.css";

function RescueDetails() {
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    const existing = JSON.parse(localStorage.getItem("rescueData")) || {};

    localStorage.setItem(
      "rescueData",
      JSON.stringify({
        ...existing,
        [field]: value
      })
    );
  };

  return (
    <div className="rescue-container">

      <h1 className="rescue-title">Animal Details</h1>

      <div className="steps">
        <button className="step" onClick={() => navigate("/rescue")}>1 Location</button>
        <button className="step active">2 Details</button>
        <button className="step" onClick={() => navigate("/rescue-upload")}>3 Upload</button>
        <button className="step" onClick={() => navigate("/rescue-contact")}>4 Contact</button>
      </div>

      <div className="rescue-content">

        <div className="form-box">

          <label>Animal Type</label>
          <select onChange={(e) => handleChange("animalType", e.target.value)}>
            <option>Select</option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Bird</option>
            <option>Other</option>
          </select>

          <label>Injury Level</label>
          <select onChange={(e) => handleChange("injuryLevel", e.target.value)}>
            <option>Select</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            className="submit-btn"
            onClick={() => navigate("/rescue-upload")}
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
}

export default RescueDetails;