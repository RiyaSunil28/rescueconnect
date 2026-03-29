import "./Adopt.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Adopt() {
  const navigate = useNavigate();

  const [petsData, setPetsData] = useState([]);
  const [species, setSpecies] = useState("All");
  const [gender, setGender] = useState("None");
  const [loading, setLoading] = useState(true); // ✅ NEW

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/pets");
        console.log("Pets:", res.data);
        setPetsData(res.data);
      } catch (err) {
        console.error("Error fetching pets:", err);
      } finally {
        setLoading(false); // ✅ NEW
      }
    };

    fetchPets();
  }, []);

  // ✅ FILTER LOGIC
  const filteredPets = petsData.filter((pet) => {
    return (
      (species === "All" || pet.type === species) &&
      (gender === "None" || pet.gender === gender)
    );
  });

  return (
    <div className="adopt-page">

      {/* HEADER */}
      <div className="adopt-header">
        <h1>Adopt a Friend</h1>
      </div>

      <div className="adopt-container">

        {/* FILTER */}
        <div className="filter-box">
          <h3>Filter</h3>

          <label>Species</label>
          <select onChange={(e) => setSpecies(e.target.value)}>
            <option>All</option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Bird</option>
            <option>Rabbit</option>
          </select>

          <label>Gender</label>
          <select onChange={(e) => setGender(e.target.value)}>
            <option>None</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <button className="apply-btn">Apply</button>
        </div>

        {/* PET GRID */}
        <div className="pet-grid">
          {loading ? (
            <p>Loading pets...</p>  // ✅ FIX flicker
          ) : filteredPets.length === 0 ? (
            <p>No pets available</p>
          ) : (
            filteredPets.map((pet) => (
              <div className="pet-card" key={pet._id}>

                {/* ✅ IMAGE FIX (fallback added) */}
                <img
                  src={
                    pet.image ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={pet.name}
                />

                <h3>{pet.name}</h3>
                <p>{pet.breed}</p>
                <p>{pet.age} yrs • {pet.gender}</p>

                <div className="card-buttons">
                  <button onClick={() => navigate(`/pet/${pet._id}`)}>
                    Learn More
                  </button>

                  <button
                    className="adopt-btn"
                    onClick={() => navigate(`/adopt/${pet._id}`)}
                  >
                    Adopt
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Adopt;