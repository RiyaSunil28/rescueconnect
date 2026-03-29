import "./Volunteer.css";

function Transporter() {
  return (
    <div className="volunteer-page">
      <div className="volunteer-header">
        <h1>Transporter</h1>
      </div>

      <div className="volunteer-container">
        <div className="roles-box">
          <h2>Role Details</h2>
          <p>
            Transport rescued animals safely between locations such as
            shelters, clinics, and foster homes.
          </p>

          <h3>Responsibilities</h3>
          <ul>
            <li>Drive animals safely</li>
            <li>Coordinate pickup/drop</li>
            <li>Ensure comfort during travel</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Transporter;