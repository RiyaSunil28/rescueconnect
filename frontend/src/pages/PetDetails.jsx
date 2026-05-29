import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get("https://rescueconnect-a8ug.onrender.com/api/pets");
        const found = res.data.find(p => p._id === id);
        setPet(found);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPet();
  }, [id]);

  if (!pet) return <div>Loading...</div>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{pet.name}</h1>
      <img src={pet.image} width="300" />

      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age}</p>
      <p><strong>Gender:</strong> {pet.gender}</p>
    </div>
  );
}

export default PetDetails;