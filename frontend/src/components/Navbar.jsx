// src/components/Navbar.jsx
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <h2 className="brand">RescueConnect</h2>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="#about" className="nav-item">About Us</a>       {/* ✅ scrolls to About */}
        <a href="#services" className="nav-item">Our Services</a> {/* scrolls to Services */}
        <Link to="/trackcase">Track Case</Link>
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

