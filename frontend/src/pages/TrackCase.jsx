import { useState } from "react";

function TrackCase() {

  const [caseId, setCaseId] = useState("");
  const [result, setResult] = useState(null);

  const handleTrack = async () => {
    if (!caseId) return alert("Enter Case ID");

    try {
      const res = await fetch(`https://rescueconnect-a8ug.onrender.com/api/rescue/${caseId}`);
      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        alert(data.message || "Case not found");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };


  return (
    <div style={{padding:"40px", textAlign:"center"}}>

      <h2>Track Your Case</h2>
      <p>Enter your case ID to check the rescue status</p>

      <input
        type="text"
        placeholder="Enter Case ID"
        value={caseId}
        onChange={(e)=>setCaseId(e.target.value)}
        style={{
          padding:"10px",
          width:"250px",
          marginRight:"10px",
          borderRadius:"6px"
        }}
      />


      <button onClick={handleTrack} style={{
        padding:"10px 20px",
        background:"#2c7a7b",
        color:"white",
        border:"none",
        borderRadius:"6px"
      }}>
        Track
      </button>

      {/* ✅ RESULT DISPLAY */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Status: {result.status}</h3>
          <p><strong>Animal:</strong> {result.animalType}</p>
          <p><strong>Condition:</strong> {result.injuryLevel}</p>
          <p><strong>Location:</strong> {result.location}</p>
        </div>
      )}

    </div>
  );
}

export default TrackCase;