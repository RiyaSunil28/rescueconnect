import { useNavigate } from "react-router-dom";

function RescueLocation() {

  const navigate = useNavigate();

  return (
    <div className="rescue-container">

      <h2>Report an Animal in Distress</h2>

      {/* Steps */}
      <div className="steps">
        <button className="active">1 Location</button>
        <button>2 Details</button>
        <button>3 Upload</button>
        <button>4 Contact</button>
      </div>

      <div className="rescue-content">

        {/* MAP */}
        <div className="map-box">
          Map will appear here
        </div>

        {/* FORM */}
        <div className="form-box">

          <label>Location</label>
          <input type="text" placeholder="Enter location" />

          <label>Animal Description</label>
          <textarea placeholder="Add any animal description..."></textarea>

          <button onClick={() => navigate("/rescue-details")}>
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default RescueLocation;