import "./Volunteer.css";
import { useState } from "react";
import axios from "axios";

function VolunteerApply() {

  // ✅ ADD STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  // ✅ HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { name, email, phone, role };

      console.log("Sending:", data);

      await axios.post("http://localhost:5000/api/volunteer", data);

      alert("Application submitted successfully ✅");

      // reset form
      setName("");
      setEmail("");
      setPhone("");
      setRole("");

    } catch (err) {
      console.error(err);
      alert("Error submitting ❌");
    }
  };

  return (
    <div className="volunteer-page">
      <div className="volunteer-header">
        <h1>Volunteer Application</h1>
      </div>

      <div className="volunteer-container">
        <div className="roles-box">
          <h2>Apply Now</h2>

          {/* ✅ ADD onSubmit */}
          <form onSubmit={handleSubmit}>

            {/* ✅ ADD value + onChange */}
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            /><br /><br />

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br /><br />

            <input
              type="text"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            /><br /><br />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option>Foster Parent</option>
              <option>Transporter</option>
              <option>Social Media</option>
            </select><br /><br />

            {/* ✅ IMPORTANT: type="submit" */}
            <button className="apply-btn" type="submit">
              Submit
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default VolunteerApply;