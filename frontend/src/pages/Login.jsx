import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      // ✅ HANDLE ERROR PROPERLY
      if (!res.ok) {
        alert(data.message || "Login failed ❌");
        return;
      }

      // ✅ SUCCESS
      alert("Login successful ✅");
      navigate("/");

    } catch (err) {
      console.error("Login error:", err);
      alert("Server not responding ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2 className="login-title">Login</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;