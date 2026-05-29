import React, { useState } from "react";
import "./Abuse.css";

function Abuse() {
  const [step, setStep] = useState(1);

  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [condition, setCondition] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    caseId: ""
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    let priority = "low";

    if (condition.toLowerCase().includes("injured")) priority = "high";
    if (reportType === "abuse") priority = "high";
    if (description.length > 50) priority = "medium";

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const reportData = {
        location: `${pos.coords.latitude},${pos.coords.longitude}`,
        animalDescription: description,
        animalType,
        injuryLevel: condition,
        name,
        phone,
        email,
        status: "pending",
        priority
      };

      try {
        const res = await fetch("http://localhost:5000/api/rescue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reportData)
        });

        const data = await res.json();

        if (res.ok) {
          const caseId = data.trackId;

          // ❌ REMOVE ALERT
          // alert(`Report submitted successfully ✅\nCase ID: ${data._id}`);

          // ✅ POPUP INSTEAD
          setPopup({
            show: true,
            caseId
          });

          setStep(1);
        } else {
          alert(data.message || "Error submitting report");
        }

      } catch (err) {
        console.error(err);
        alert("Server error ❌");
      }
    });
  };

  return (
    <div className="abuse-container">

      <div className="abuse-header">
        <h1>Report Abuse or Neglect (Urgent)</h1>
      </div>

      <div className="steps-section">
        <div className={step === 1 ? "step active" : "step"}>1 Report Type</div>
        <div className="arrow">→</div>
        <div className={step === 2 ? "step active" : "step"}>2 Animal Details</div>
        <div className="arrow">→</div>
        <div className={step === 3 ? "step active" : "step"}>3 Your Contact Info</div>
      </div>

      <div className="form-section">

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="form-left">
              <h3>Report Type</h3>

              <label>
                <input type="radio" name="reportType" onChange={() => setReportType("abuse")} />
                Abused
              </label>

              <label>
                <input type="radio" name="reportType" onChange={() => setReportType("neglect")} />
                Neglected
              </label>

              <label>
                <input type="radio" name="reportType" onChange={() => setReportType("injured")} />
                Injured Animal
              </label>
            </div>

            <div className="form-right">
              <label>Animal Details</label>
              <input
                type="text"
                placeholder="Describe the animal..."
                onChange={(e) => setDescription(e.target.value)}
              />

              <button className="submit-btn" onClick={nextStep}>
                Next →
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="form-right" style={{ width: "100%" }}>
            <label>Animal Type</label>
            <select onChange={(e) => setAnimalType(e.target.value)}>
              <option>Select Animal</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Bird</option>
              <option>Others</option>
            </select>

            <label>Condition</label>
            <input
              type="text"
              placeholder="Injured / Sick / Normal"
              onChange={(e) => setCondition(e.target.value)}
            />

            <label>Upload Image</label>
            <input type="file" />

            <div className="btn-group">
              <button className="submit-btn" onClick={prevStep}>
                ← Previous
              </button>

              <button className="submit-btn" onClick={nextStep}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="form-right" style={{ width: "100%" }}>
            <label>Full Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />

            <label>Phone Number</label>
            <input type="text" onChange={(e) => setPhone(e.target.value)} />

            <label>Email Address</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />

            <div className="btn-group">
              <button className="submit-btn" onClick={prevStep}>
                ← Previous
              </button>

              <button className="submit-btn" onClick={handleSubmit}>
                Submit Report
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 🔥 POPUP */}
      {popup.show && (
        <div className="popup">
          <h2>Report Submitted Successfully ✅</h2>

          <p>
            Case ID: <b>{popup.caseId}</b>
          </p>

          <button
            onClick={() => {
              navigator.clipboard.writeText(popup.caseId);
              alert("Case ID copied ✅");
            }}
          >
            Copy Case ID :
          </button>

          <button
            onClick={() => setPopup({ show: false, caseId: "" })}
          >
            Close
          </button>
        </div>
      )}

    </div>
  );
}

export default Abuse;