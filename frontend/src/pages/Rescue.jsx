import "./Rescue.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Rescue() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);

  // ✅ AUTO LOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        console.log("LOCATION:", lat, lng);

        setLocation(`Lat: ${lat}, Lng: ${lng}`);
        setCoords({ lat, lng });

        const existing = JSON.parse(localStorage.getItem("rescueData")) || {};

        localStorage.setItem(
          "rescueData",
          JSON.stringify({
            ...existing,
            location: `Lat: ${lat}, Lng: ${lng}`,
            lat,
            lng
          })
        );
      },
      () => alert("Allow location access")
    );
  }, []);

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

      <h1 className="rescue-title">Report an Animal in Distress</h1>

      <div className="steps">
        <button className="step active">1 Location</button>
        <button className="step" onClick={() => navigate("/rescue-details")}>2 Details</button>
        <button className="step" onClick={() => navigate("/rescue-upload")}>3 Upload</button>
        <button className="step" onClick={() => navigate("/rescue-contact")}>4 Contact</button>
      </div>

      <div className="rescue-content">

        {/* ✅ LIVE MAP */}
        <div className="map-box">
          {coords ? (
            <iframe
              title="map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
            ></iframe>
          ) : (
            <div>Detecting location...</div>
          )}
        </div>

        <div className="form-box">

          <label>Location</label>
          <input
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              handleChange("location", e.target.value);
            }}
          />

          <label>Animal Description</label>
          <textarea
            onChange={(e) => handleChange("notes", e.target.value)}
          />

          <button onClick={() => navigate("/rescue-details")}>
            Next
          </button>

        </div>
      </div>
    </div>
  );
}

export default Rescue;
