import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
  const fetchCases = async () => {
      try {
    const res = await axios.get("http://localhost:5000/api/rescue");
    setCases(res.data);
      } catch (err) {
        console.error("Error fetching:", err);
      }
  };

    fetchCases();
  }, []);

  const updateStatus = async (id, status) => {
    try {
    await axios.put(`http://localhost:5000/api/rescue/${id}`, { status });

      // refresh
      const res = await axios.get("http://localhost:5000/api/rescue");
      setCases(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard 🚑</h2>

      {cases.map((c) => (
        <div key={c._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p><b>Animal:</b> {c.animalType}</p>
          <p><b>Injury:</b> {c.injuryLevel}</p>
          <p><b>Location:</b> {c.location}</p>
          <p><b>Status:</b> {c.status}</p>

          <button onClick={() => updateStatus(c._id, "assigned")}>
            Assign
          </button>

          <button onClick={() => updateStatus(c._id, "rescued")}>
            Rescued
          </button>
          </div>
      ))}
    </div>
  );
}

export default AdminDashboard;