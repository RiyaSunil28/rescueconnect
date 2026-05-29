import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      // ❌ LOGIN ERROR
      if (!res.ok) {
        alert(data.message || "Login failed ❌");
        return;
      }

      // ✅ STORE LOGIN DATA
      localStorage.setItem("token", data.token);

      // ✅ STORE EMAIL FOR DELETE ACCOUNT
      localStorage.setItem("userId", email);

      if (data.user) {

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // ✅ CLEAR INPUTS AFTER LOGIN
      setEmail("");
      setPassword("");

      alert("Login successful ✅");

      navigate("/");

    } catch (err) {

      console.error("Login error:", err);

      alert("Server not responding ❌");
    }
  };

  // ✅ LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    // ✅ CLEAR INPUTS
    setEmail("");
    setPassword("");

    alert("Logged out successfully ✅");

    navigate("/login");
  };

  // ✅ DELETE ACCOUNT
  const handleDeleteAccount = async () => {

    const userId =
      localStorage.getItem("userId");

    // ❌ USER NOT LOGGED IN
    if (!userId) {
      alert("Please login first ❌");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE"
        }
      );

      const data = await res.json();

      // ❌ DELETE ERROR
      if (!res.ok) {
        alert(data.message || "Delete failed ❌");
        return;
      }

      alert("Account deleted successfully ✅");

      // ✅ CLEAR STORAGE
      localStorage.clear();

      // ✅ CLEAR INPUTS
      setEmail("");
      setPassword("");

      window.location.href = "/signup";

    } catch (err) {

      console.error(err);

      alert("Server error deleting account ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2 className="login-title">
          Login
        </h2>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Email"
            required
            autoComplete="off"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* PASSWORD */}
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter Password"
            required
            autoComplete="off"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {/* SHOW PASSWORD */}
          <div
            style={{
              marginTop: "10px",
              color: "white",
              fontSize: "14px",
              textAlign: "left"
            }}
          >
            <input
              type="checkbox"
              onChange={() =>
                setShowPassword(!showPassword)
              }
            />{" "}
            Show Password
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        {/* ✅ FORGOT PASSWORD */}
        <p
          style={{
            marginTop: "15px",
            textAlign: "center"
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              color: "#2c7a7b",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Forgot Password?
          </Link>
        </p>

        {/* ✅ LOGOUT */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "12px",
            background: "#2c7a7b",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Logout
        </button>

        {/* ✅ DELETE ACCOUNT */}
        <button
          onClick={handleDeleteAccount}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            background: "#2f5d50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Delete Account
        </button>

        {/* SIGNUP */}
        <p className="signup-text">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="signup-link"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;