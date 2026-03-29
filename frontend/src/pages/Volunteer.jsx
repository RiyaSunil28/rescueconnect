import "./Volunteer.css";
import { useNavigate } from "react-router-dom";

function Volunteer() {
  const navigate = useNavigate();

  return (
    <div className="volunteer-page">

      {/* HEADER */}
      <div className="volunteer-header">
        <h1>Join Our Team</h1>
      </div>

      <div className="volunteer-container">

        {/* LEFT SIDE */}
        <div className="roles-box">
          <h2>Available Volunteer Roles</h2>

          <div 
            className="role"
            onClick={() => navigate("/volunteer/foster")}
          >
            <h3>Foster Parent</h3>
            <p>
              Foster parents provide temporary homes for rescued animals
              until they find permanent families.
            </p>
          </div>

          <div 
            className="role"
            onClick={() => navigate("/volunteer/transporter")}
          >
            <h3>Transporter</h3>
            <p>
              Help transport rescued animals to shelters, veterinary
              clinics, or foster homes safely.
            </p>
          </div>

          <div 
            className="role"
            onClick={() => navigate("/volunteer/social-media")}
          >
            <h3>Social Media</h3>
            <p>
              Manage social media posts, promote adoption campaigns,
              and help spread awareness online.
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="process-box">
          <h2>Our Volunteer Application Process</h2>

          <div className="step">
            <span className="number">1</span>
            <div>
              <h3>Apply</h3>
              <p>Submit your volunteer application.</p>
            </div>
          </div>

          <div className="step">
            <span className="number">2</span>
            <div>
              <h3>Train</h3>
              <p>Complete basic volunteer training.</p>
            </div>
          </div>

          <div className="step">
            <span className="number">3</span>
            <div>
              <h3>Serve</h3>
              <p>Start helping rescued animals and support our mission.</p>
            </div>
          </div>

          <button 
            className="apply-btn"
            onClick={() => navigate("/volunteer/apply")}
          >
            Submit Application
          </button>

        </div>

      </div>
    </div>
  );
}

export default Volunteer;