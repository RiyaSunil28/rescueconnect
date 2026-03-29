// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AdminDashboard from "./pages/AdminDashboard";
import PetDetails from "./pages/PetDetails";
import AdoptForm from "./pages/AdoptForm";
import LiveMap from "./pages/LiveMap";
import VolunteerApply from "./pages/VolunteerApply";
import Process from "./components/Process";
import Services from "./components/Services";
import Footer from "./components/Footer";
import About from "./components/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Rescue from "./pages/Rescue";
import Abuse from "./pages/Abuse";
import MedicalHelp from "./pages/MedicalHelp";
import Adopt from "./pages/Adopt";
import Volunteer from "./pages/Volunteer";
import TrackCase from "./pages/TrackCase";
import RescueDetails from "./pages/RescueDetails";
import RescueUpload from "./pages/RescueUpload";
import RescueContact from "./pages/RescueContact";
import { FaComments } from "react-icons/fa";
import { useState, useEffect } from "react";
import WoundCare from "./pages/WoundCare";
import PoisonControl from "./pages/PoisonControl";
import Fractures from "./pages/Fractures";
import EmergencySigns from "./pages/EmergencySigns";
import FosterParent from "./pages/FosterParent";
import Transporter from "./pages/Transporter";
import SocialMedia from "./pages/SocialMedia";
import axios from "axios";
import "./App.css";

// ✅ MAIN APP CONTENT
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ FIXED

  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you? 🐾" }
  ]);
  const [input, setInput] = useState("");

  const [users, setUsers] = useState([]);
  const API_URL = "http://localhost:5000/api/users";

  // ✅ FETCH USERS (SAFE)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API_URL);
        setUsers(res.data || []);
      } catch (error) {
        console.warn("Users API not available (safe to ignore)");
        console.error(error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  // ✅ REGISTER USER
  const registerUser = async (userData) => {
    try {
      await axios.post(`${API_URL}/register`, userData);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ CHATBOT LOGIC
  const getBotReply = (msg) => {
    msg = msg.toLowerCase();

   if (msg.includes("wound")) {
  setTimeout(() => navigate("/wound-care"), 1000);
  return "🩹 Opening Wound Care...";
}

if (msg.includes("fracture")) {
  setTimeout(() => navigate("/fractures"), 1000);
  return "🐾 Opening Fractures...";
}

if (msg.includes("poison")) {
  setTimeout(() => navigate("/poison-control"), 1000);
  return "⚠️ Opening Poison Control...";
}

if (msg.includes("emergency")) {
  setTimeout(() => navigate("/emergency-signs"), 1000);
  return "🚨 Opening Emergency Signs...";
}

if (msg.includes("foster")) {
  setTimeout(() => navigate("/volunteer/foster"), 1000);
  return "🏠 Opening Foster Role...";
}

if (msg.includes("transport")) {
  setTimeout(() => navigate("/volunteer/transporter"), 1000);
  return "🚚 Opening Transporter...";
}

if (msg.includes("social")) {
  setTimeout(() => navigate("/volunteer/social-media"), 1000);
  return "📱 Opening Social Media Role...";
}

    return "Try asking about rescue, adoption, abuse or volunteering 🐾";
  };

  // ✅ SEND MESSAGE
  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const userInput = input;
    setInput("");

    // typing effect
    setMessages((prev) => [...prev, { sender: "bot", text: "..." }]);

    setTimeout(() => {
      setMessages((prev) => prev.slice(0, -1));

      const botMsg = {
        sender: "bot",
        text: getBotReply(userInput)
      };

      setMessages((prev) => [...prev, botMsg]);

      const chatBody = document.querySelector(".chat-body");
      if (chatBody) {
        chatBody.scrollTo({
          top: chatBody.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 1000);
  };

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<><Hero /><About /><Process /><Services /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup registerUser={registerUser} />} />
        <Route path="/wound-care" element={<WoundCare />} />
      <Route path="/poison-control" element={<PoisonControl />} />
         <Route path="/fractures" element={<Fractures />} />
         <Route path="/pet/:id" element={<PetDetails />} />
       <Route path="/adopt/:id" element={<AdoptForm />} />
         <Route path="/emergency-signs" element={<EmergencySigns />} />
        <Route path="/volunteer/apply" element={<VolunteerApply />} />
       <Route path="/volunteer/foster" element={<FosterParent />} />
        <Route path="/volunteer/transporter" element={<Transporter />} />
      <Route path="/volunteer/social-media" element={<SocialMedia />} />
        <Route path="/rescue" element={<Rescue />} />
        <Route path="/abuse" element={<Abuse />} />
        <Route path="/medical-help" element={<MedicalHelp />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/trackcase" element={<TrackCase />} />
        <Route path="/rescue-details" element={<RescueDetails />} />
        <Route path="/rescue-upload" element={<RescueUpload />} />
        <Route path="/rescue-contact" element={<RescueContact />} />
        <Route path="/map" element={<LiveMap />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* 💬 CHATBOT ICON */}
      <div
        className="chatbot-icon"
        onClick={() => {
          if (openChat) {
            setMessages([{ sender: "bot", text: "Hello! How can I help you? 🐾" }]);
          }
          setOpenChat(!openChat);
        }}
      >
        <FaComments />
      </div>

      {/* 💬 CHATBOT */}
      {openChat && (
        <div className="chatbot-container">
          <div className="chat-header">
            RescueConnect Bot
            <span
              onClick={() => {
                setMessages([{ sender: "bot", text: "Hello! How can I help you? 🐾" }]);
                setOpenChat(false);
              }}
            >
              ✖
            </span>
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              value={input}
              placeholder="Type a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      {/* ✅ USERS ONLY ON HOMEPAGE (FIXED PROPERLY) */}
      {location.pathname === "/" && (
        <div style={{ padding: "20px" }}>
          <h3>Registered Users</h3>
          {Array.isArray(users) &&
            users.map((u) => (
              <div key={u._id}>
                {u.name} - {u.email}
              </div>
            ))}
        </div>
      )}
    </>
  );
}

// ✅ WRAPPER
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;