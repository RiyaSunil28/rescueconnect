import "./Volunteer.css";

function FosterParent() {
  return (
    <div className="volunteer-page">
      <div className="volunteer-header">
        <h1>Foster Parent</h1>
      </div>

      <div className="volunteer-container">
        <div className="roles-box">
          <h2>Role Details</h2>
          <p>
            As a Foster Parent, you will provide temporary shelter and care
            for rescued animals until they are adopted.
          </p>

          <h3>Responsibilities</h3>
          <ul>
            <li>Provide safe and loving home</li>
            <li>Feed and care for animals</li>
            <li>Coordinate with rescue team</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FosterParent;