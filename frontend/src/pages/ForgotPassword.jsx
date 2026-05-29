import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(
        "https://rescueconnect-a8ug.onrender.com/api/users/forgot-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            newPassword
          })
        }
      );

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        navigate("/login");
      }

    } catch (err) {
      console.error(err);
      alert("Error resetting password ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2 className="login-title">
          Reset Password
        </h2>

        <form
          className="login-form"
          onSubmit={handleReset}
        >

          <input
            type="email"
            placeholder="Enter Registered Email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter New Password"
            required
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          {/* 👁 SHOW PASSWORD */}
          <div
            style={{
              marginTop: "10px",
              color: "white",
              fontSize: "14px"
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

          <button
            type="submit"
            className="login-btn"
          >
            Reset Password
          </button>

        </form>

      </div>
    </div>
  );
}

export default ForgotPassword;