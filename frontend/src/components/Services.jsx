import { FaHeartbeat, FaExclamationTriangle, FaHandsHelping, FaPaw, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Services() {
  const navigate = useNavigate();

  // ✅ DEFAULT SERVICES (always shown first)
  const defaultServices = [
    {
      _id: "1",
      icon: "heartbeat",
      title: "Immediate Rescue & Medical Care",
      shortText: "We provide urgent medical attention and rehabilitation.",
      route: "/rescue",
      buttonText: "Learn More"
    },
    {
      _id: "2",
      icon: "warning",
      title: "Report Abuse or Neglect",
      shortText: "Alert us to animals in distress. We respond quickly.",
      route: "/abuse",
      buttonText: "Report Abuse"
    },
    {
      _id: "3",
      icon: "volunteer",
      title: "Adopt & Volunteer Opportunities",
      shortText: "Help us find loving homes or volunteer with us.",
      route: "/volunteer",
      buttonText: "Get Involved"
    }
  ];

  // ✅ START WITH DEFAULT → prevents flicker
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => {
        // ✅ only replace if backend actually has data
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(err => {
        console.error("Error fetching services:", err);
      });
  }, []);

  // ✅ ICON MAPPING
  const iconMap = {
    heartbeat: <FaHeartbeat className="service-icon" />,
    warning: <FaExclamationTriangle className="service-icon" />,
    volunteer: <FaHandsHelping className="service-icon" />,
    adopt: <FaPaw className="service-icon" />,
    medical: <FaPlusCircle className="service-icon" />
  };

  return (
    <section id="services" className="services">
      <h2>Services at our side:</h2>

      <div className="service-cards">
        {services.map((service) => (
          <div className="card" key={service._id}>
            
            {/* ICON */}
            {iconMap[service.icon] || <FaHeartbeat className="service-icon" />}

            {/* TITLE */}
            <h3>{service.title}</h3>

            {/* DESCRIPTION */}
            <p>{service.shortText}</p>

            {/* BUTTON */}
            <button onClick={() => navigate(service.route)}>
              {service.buttonText}
            </button>

          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;