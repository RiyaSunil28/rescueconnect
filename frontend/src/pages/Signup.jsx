import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  // ✅ State for inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Handle signup
  const handleSignup = async (e) => {
    e.preventDefault(); // stop page reload

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          email,
          password
        })
      });

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        // ✅ redirect to login after signup
        navigate("/login");
      }

    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Sign Up</h2>

        <form className="login-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </form>

        <p className="signup-text">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;