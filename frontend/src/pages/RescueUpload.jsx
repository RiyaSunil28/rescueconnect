import { useNavigate } from "react-router-dom";
import "./Rescue.css";

function RescueUpload() {
  const navigate = useNavigate();

  const handleNotes = (value) => {
    const existing = JSON.parse(localStorage.getItem("rescueData")) || {};

    localStorage.setItem(
      "rescueData",
      JSON.stringify({
        ...existing,
        notes: value
      })
    );
  };

  return (
    <div className="rescue-container">

      <h1 className="rescue-title">Upload Evidence</h1>

      <div className="steps">
        <button className="step" onClick={() => navigate("/rescue")}>1 Location</button>
        <button className="step" onClick={() => navigate("/rescue-details")}>2 Details</button>
        <button className="step active">3 Upload</button>
        <button className="step" onClick={() => navigate("/rescue-contact")}>4 Contact</button>
      </div>

      <div className="rescue-content">

        <div className="form-box">

          <label>Upload Image</label>
          <input type="file" />

          <label>Notes</label>
          <textarea onChange={(e) => handleNotes(e.target.value)} />

          <button
            className="submit-btn"
            onClick={() => navigate("/rescue-contact")}
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}

export default RescueUpload;