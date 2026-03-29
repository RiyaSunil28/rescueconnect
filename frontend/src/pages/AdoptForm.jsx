import { useParams, useNavigate } from "react-router-dom";

function AdoptForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const petsData = [
    { id: 1, name: "Golden Retriever" },
    { id: 2, name: "Tabby" },
    { id: 3, name: "Kany" },
    { id: 4, name: "Maria" },
    { id: 5, name: "Moris" },
    { id: 6, name: "Remer" },
  ];

  const pet = petsData.find((p) => p.id === Number(id));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Adoption request submitted for ${pet.name} 🐾`);
    navigate("/");
  };

  if (!pet) {
    return <h2 style={{ padding: "40px" }}>Pet not found ❌</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Adopt {pet.name}</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>

        <label>Name</label><br />
        <input type="text" required /><br /><br />

        <label>Email</label><br />
        <input type="email" required /><br /><br />

        <label>Address</label><br />
        <input type="text" required /><br /><br />

        <label>Why do you want to adopt?</label><br />
        <textarea required /><br /><br />

        <button type="submit">Submit</button>
      </form>

      <br />
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
}

export default AdoptForm;