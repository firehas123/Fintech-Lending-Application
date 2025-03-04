import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Using Axios to make the POST request
      const response = await axios.post("http://localhost:8000/user-pannel/login", {
        email: formData.email,
        password: formData.password,
      });

      // If the request is successful, you can check the response data:
      const data = response.data; 
      if (data.success) {
        // alert(data.message);
         // Navigate to the OTP verification page
         
         // If Admin
         if (data.role === "admin") {
          navigate("/otp-verification");
          // navigate("/dashboard");
        }
        // If User
        else if (data.role === "user") {
          navigate("/user-pannel");
        }
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      // If server returned an error (e.g., 401), it will end up here
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#d3d7df",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
          MKOPOSOLUTION
        </h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Sign in to start your session
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <input
              type="email"
              name="email"
              placeholder="admin@demo.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "85%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                paddingRight: "40px",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#666",
              }}
            >
              📧
            </span>
          </div>
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "85%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                paddingRight: "40px",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#666",
              }}
            >
              🔒
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              style={{ marginRight: "8px" }}
            />
            <label style={{ color: "#666" }}>Remember Me</label>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          <a href="#" style={{ color: "#007bff", textDecoration: "none" }}>
            I forgot my password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
