const express = require("express");
const loanOffers = require("../models/loanoffers");
const LoanApplication = require("../models/loanApplications");
const router = express.Router();

router.get("/apply-loan", (req, res) => {
  loanOffers.find({}).then((data) => res.send(data));
});

router.post("/apply-loan", async (req, res) => {
  try {
    console.log("📩 Received Loan Application Data:", req.body); // Debugging log

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

    // 🛑 Check if request body is empty (possible parsing issue)
    if (!req.body || Object.keys(req.body).length === 0) {
      console.log("❌ Error: Empty request body received!");
      return res
        .status(400)
        .json({ error: "Invalid request! No data received." });
    }

    // ✅ Validate required fields
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

    // ✅ Validate that documents are Base64 strings
    if (
      !Array.isArray(documents) ||
      !documents.every(
        (doc) => typeof doc === "string" && doc.startsWith("data:")
      )
    ) {
      console.log("❌ Invalid documents format");
      return res
        .status(400)
        .json({ error: "Documents must be an array of valid Base64 strings." });
    }

    // ✅ Validate signature format (Base64 check)
    if (typeof signature !== "string" || !signature.startsWith("data:")) {
      console.log("❌ Invalid signature format");
      return res.status(400).json({ error: "Invalid signature format." });
    }

    // ✅ Create new loan application
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
    res
      .status(201)
      .json({ message: "Loan application submitted successfully!" });
  } catch (error) {
    console.error("❌ Error submitting loan application:", error);
    res.status(500).json({ error: "Failed to submit loan application" });
  }
});

module.exports = router;
