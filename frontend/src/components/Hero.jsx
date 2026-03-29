import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import pic from "../assets/pic.png";
function Hero() {
  const navigate =useNavigate();
  return (
    <section className="hero">

      {/* LEFT IMAGES */}
      <div className="hero-left">
        <img src={pic} alt="dog" className="dog" />
        <Link to="/trackcase">
         <button className="track-btn">
          <FaPaw /> Track Case
          </button>
        </Link>
      </div>

      {/* CENTER TEXT */}
      <div className="hero-center">
        <h1>COMPASSION HAS NO LIMITS</h1>
        <p>
          “Saving one animal won't change the world, but will
          change the world for that one animal”
        </p>
      </div>

      {/* RIGHT BUTTONS */}
      <div className="hero-right">
        <button
        className="hero-btn"
        onClick={() => navigate("/rescue")}
        >
          RESCUE
          </button>
        <Link to="/abuse">
          <button className="rescue-btn">ABUSE</button>
        </Link>
         <Link to="/medical-help">
          <button className="service-btn">MEDICAL HELP</button>
        </Link>
        <Link to="/adopt">
           <button>ADOPT</button>
        </Link>
       <Link to="/volunteer">
       <button>VOLUNTEER</button>
       </Link>
      </div>

    </section>
  );
}

export default Hero;