const express = require("express");
const loanOffers = require("../models/loanoffers");
const LoanApplication = require("../models/loanApplications");
const router = express.Router();
const twilio = require("twilio");

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID; 
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Global variable to hold the OTP in memory
let savedOtp = null;

router.get("/apply-loan", (req, res) => {
  loanOffers.find({}).then((data) => res.send(data));
});

console.log("🔑 Twilio Credentials:", TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const phone = "+4915213375856"; // Default phone number

  // Function to generate a 6-digit OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  if (email === "admin@demo.com" && password === "admin@123") {
    const otp = generateOtp();
    savedOtp = otp; // Save OTP in memory
    try {
      const message = await client.messages.create({
        body: `Your OTP code is: ${otp}`,
        from: TWILIO_PHONE_NUMBER,
        to: phone,
      });
      console.log("SMS sent successfully. Message SID:", message.sid);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
    return res.json({
      success: true,
      role: "admin",
      message: "OTP sent successfully for Admin!",
    });
  } else if (email === "user@demo.com" && password === "user@123") {
    const otp = generateOtp();
    savedOtp = otp; // Save OTP in memory
    try {
      const message = await client.messages.create({
        body: `Your OTP code is: ${otp}`,
        from: TWILIO_PHONE_NUMBER,
        to: phone,
      });
      console.log("SMS sent successfully. Message SID:", message.sid);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
    return res.json({
      success: true,
      role: "user",
      message: "OTP sent successfully for User!",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
});

router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (otp === savedOtp) {
    // Clear the OTP after successful verification
    savedOtp = null;
    return res.json({
      success: true,
      message: "OTP verified successfully!",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid OTP",
    });
  }
});

router.post("/apply-loan", async (req, res) => {
  try {
    console.log("📩 Received Loan Application Data:", req.body);

    const {
      loanType,
      borrowerIncome,
      loanAmount,
      loanTerm,
      interestRate,
      penalty,
      monthlyInstallment,
      riskLevel,
      documents,
      signature,
    } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      console.log("❌ Error: Empty request body received!");
      return res.status(400).json({ error: "Invalid request! No data received." });
    }

    if (
      !loanType ||
      !borrowerIncome ||
      !loanAmount ||
      !loanTerm ||
      !interestRate ||
      !penalty ||
      !monthlyInstallment ||
      !riskLevel ||
      !signature
    ) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (
      !Array.isArray(documents) ||
      !documents.every((doc) => typeof doc === "string" && doc.startsWith("data:"))
    ) {
      console.log("❌ Invalid documents format");
      return res.status(400).json({ error: "Documents must be an array of valid Base64 strings." });
    }

    if (typeof signature !== "string" || !signature.startsWith("data:")) {
      console.log("❌ Invalid signature format");
      return res.status(400).json({ error: "Invalid signature format." });
    }

    const newLoan = new LoanApplication({
      loanType,
      borrowerIncome,
      loanAmount,
      loanTerm,
      interestRate,
      penalty,
      monthlyInstallment,
      riskLevel,
      documents,
      signature,
    });

    await newLoan.save();

    console.log("✅ Loan application saved successfully!");
    res.status(201).json({ message: "Loan application submitted successfully!" });
  } catch (error) {
    console.error("❌ Error submitting loan application:", error);
    res.status(500).json({ error: "Failed to submit loan application" });
  }
});

module.exports = router;
