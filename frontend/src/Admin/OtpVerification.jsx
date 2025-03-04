import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    // Allow only a single digit per input
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto-focus on the next input if a digit is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // On Backspace, if the current field is empty, focus on the previous field
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    try {
      const response = await axios.post("http://localhost:8000/user-pannel/verify-otp", { otp: otpValue });
      const data = response.data;
      if (data.success) {
        alert("OTP verified successfully");
        navigate("/dashboard");
      } else {
        alert("OTP verification failed: " + data.message);
      }
    } catch (error) {
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
          OTP Verification
        </h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Enter the 6-digit code sent to your phone number
        </p>
        <form onSubmit={handleOtpSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index}`}
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                style={{
                  width: "45px",
                  height: "45px",
                  textAlign: "center",
                  fontSize: "18px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            ))}
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
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
