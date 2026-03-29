import React, { useState, useEffect } from "react";
import "./MedicalHelp.css";
import { useNavigate } from "react-router-dom";

function MedicalHelp() {

  const navigate = useNavigate();

  // ✅ STATES (FIXED ERROR HERE)
  const [search, setSearch] = useState("");
  const [coords, setCoords] = useState(null);
  const [vets, setVets] = useState([]);

  const [animalType, setAnimalType] = useState("");
  const [problem, setProblem] = useState("");
  const [severity, setSeverity] = useState("");

  // ✅ AUTO LOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => console.log("Location permission denied")
    );
  }, []);

  // ✅ SEARCH VETS (API + GOOGLE FALLBACK)
  const handleSearch = async () => {
    if (!search) {
      alert("Enter city or area");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/vets?city=${search}`
      );

      const data = await res.json();

      // if no DB data → open Google Maps
      if (!data || data.length === 0) {
        window.open(
          `https://www.google.com/maps/search/vet+near+${search}`
        );
      } else {
        setVets(data);
      }

    } catch (err) {
      console.error(err);

      // fallback always works
      window.open(
        `https://www.google.com/maps/search/vet+near+${search}`
      );
    }
  };

  // ✅ USE CURRENT LOCATION BUTTON
  const handleUseLocation = () => {
    if (coords) {
      window.open(
        `https://www.google.com/maps/search/vet+near+${coords.lat},${coords.lng}`
      );
    } else {
      alert("Location not available");
    }
  };

  // ✅ EMERGENCY LOGIC
  const handleEmergency = () => {
  let finalSeverity = severity;

    // auto detection
  if (problem === "poison" || problem === "fracture") {
    finalSeverity = "emergency";
  }

  if (!animalType || !problem) {
      alert("Please select animal & problem");
    return;
  }

  if (finalSeverity === "emergency") {
      alert("🚨 Emergency detected! Redirecting to Rescue...");
    navigate("/rescue");
  } else {
      alert("Showing first aid tips below 👇");
  }
};

  return (
    <div className="medical-container">

      {/* HERO */}
      <div className="medical-hero">
        <h1>Veterinary and First Aid Resources</h1>
      </div>

      {/* 🔍 CLINIC SEARCH */}
      <div className="clinics-section">
        <h2>Find Nearest Vet</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city / area"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>

          <button onClick={handleUseLocation}>
            📍 Use My Location
          </button>
        </div>

        {/* 🗺 MAP */}
        <div className="map-box">
          {coords ? (
            <iframe
              title="map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=14&output=embed`}
            />
          ) : (
            <p>Detecting location...</p>
          )}
        </div>

        {/* 🏥 VET LIST */}
        <div>
          {vets.map((vet) => (
            <div key={vet._id} style={{ marginTop: "10px" }}>
              <h4>{vet.name}</h4>
              <p>{vet.location}</p>
              <p>{vet.phone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🚨 EMERGENCY INPUT */}
      <div className="firstaid-section">
        <h2>Quick Emergency Check</h2>

        <select
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}
        >
          <option value="">Select Animal</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="others">Others</option>
        </select>

        <select
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        >
          <option value="">Select Problem</option>
          <option value="injury">Injury</option>
          <option value="poison">Poison</option>
          <option value="fracture">Fracture</option>
        </select>

        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="">Select Severity</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="emergency">Emergency</option>
        </select>

        <button onClick={handleEmergency}>
          🚑 Get Help
        </button>

        {/* 🔥 DIRECT EMERGENCY */}
        <button
          style={{
            marginTop: "10px",
            background: "red",
            color: "white"
          }}
          onClick={() => navigate("/rescue")}
        >
          🚨 Emergency Rescue
        </button>
      </div>

      {/* 📚 FIRST AID */}
      <div className="firstaid-section">
        <h2>First Aid Tips</h2>

        <div className="card-container">

          <div
            className="aid-card"
            onClick={() => navigate("/wound-care")}
          >
            🩹 Wound Care
          </div>

          <div
            className="aid-card"
            onClick={() => navigate("/poison-control")}
          >
            ⚠️ Poison Control
          </div>

          <div
            className="aid-card"
            onClick={() => navigate("/fractures")}
          >
            🐾 Fractures
          </div>

          <div
            className="aid-card"
            onClick={() => navigate("/emergency-signs")}
          >
            🚨 Emergency Signs
          </div>

        </div>
      </div>

    </div>
  );
}

export default MedicalHelp;