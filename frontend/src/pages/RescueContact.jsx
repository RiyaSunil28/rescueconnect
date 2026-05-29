import { useNavigate } from "react-router-dom";
import "./Rescue.css";
import { useState } from "react";
import axios from "axios";

function RescueContact() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    caseId: ""
  });

  const handleSubmit = async () => {
    try {
      const existing = JSON.parse(localStorage.getItem("rescueData")) || {};

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

      const res = await axios.post("https://rescueconnect-a8ug.onrender.com/api/rescue", fullData);

      const caseId = res.data.trackId;

      localStorage.setItem("lastCaseId", caseId);

      // ❌ REMOVE ALERT
      // alert(`Rescue submitted ✅\nYour Case ID: ${caseId}`);

      // ✅ SHOW POPUP INSTEAD
      setPopup({
        show: true,
        caseId
      });

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

      {/* ✅ POPUP */}
      {popup.show && (
        <div className="popup">
          <h2>Rescue Submitted Successfully ✅</h2>

          <p>
            Your Case ID: <b>{popup.caseId}</b>
          </p>

      <button
  onClick={() => {
    const id = popup.caseId;

    console.log("COPYING:", id);

    if (!id) {
      alert("No Case ID found!");
      return;
    }

    navigator.clipboard.writeText(String(id));

    alert("Case ID copied ✅");
  }}
>
  Copy Case ID :
</button>

          <button
            onClick={() => {
              setPopup({ show: false, caseId: "" });
              navigate("/trackcase");
            }}
          >
            Track Case
          </button>
        </div>
      )}

    </div>
  );
}

export default RescueContact;