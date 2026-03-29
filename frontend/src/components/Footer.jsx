import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      {/* LEFT */}
      <div className="footer-left">
        <img src={logo} alt="logo" className="footer-logo" />
        <h2>RescueConnect</h2>
        <p>
          Rescue Connect is dedicated to saving and caring for animals in need.
          Join us in our mission to make a difference, one life at a time.
        </p>
      </div>

      {/* MIDDLE */}
      <div className="footer-middle">
        <h3>Quick Links</h3>

        <Link to="/">Home</Link>
        <a href="#about">About Us</a>
        <a href="#services">Our Services</a>
        <Link to="/trackcase">Track Case</Link>
      </div>

    </footer>
  );
}

export default Footer;