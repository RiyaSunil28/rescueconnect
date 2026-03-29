// src/components/About.jsx
function About() {
  return (
    <section id="about" style={{ padding: "80px", background: "#f3eeea" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontFamily: "'Playfair Display', serif", fontSize: "36px" }}>
        About Us
      </h2>

      <p style={{ maxWidth: "800px", margin: "auto", textAlign: "center", fontSize: "18px", lineHeight: "1.8" }}>
        RescueConnect is dedicated to rescuing, rehabilitating, and rehoming animals in need.
        Our mission is to ensure every animal gets a safe and loving environment. We connect volunteers,
        adopters, and rescuers through one platform, making sure every animal receives the care it deserves.
      </p>
    </section>
  );
}

export default About;