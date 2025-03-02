const mongoose = require("mongoose");

const loanApplicationSchema = new mongoose.Schema({
  loanType: {
    type: String,
    required: [true, "Loan type is required"],
  },
  borrowerIncome: {
    type: Number,
    required: [true, "Borrower income is required"],
    min: [1000, "Borrower income must be at least 1000"], // Prevents negative or too low income
  },
  loanAmount: {
    type: Number,
    required: [true, "Loan amount is required"],
    min: [5000, "Loan amount must be at least 5000"], // Ensures minimum loan amount
  },
  loanTerm: {
    type: Number, // in months
    required: [true, "Loan term is required"],
    min: [6, "Loan term must be at least 6 months"], // Ensures minimum loan term
  },
  interestRate: {
    type: Number, // in percentage
    required: [true, "Interest rate is required"],
    min: [0.1, "Interest rate must be at least 0.1%"], // Ensures non-zero interest rate
  },
  penalty: {
    type: String, // e.g., "1.5%"
    required: [true, "Penalty is required"],
    match: [
      /^\d+(\.\d+)?%$/,
      "Penalty must be in percentage format (e.g., 1.5%)",
    ], // Validates percentage format
  },
  monthlyInstallment: {
    type: Number,
    required: [true, "Monthly installment is required"],
    min: [1, "Monthly installment must be at least 1"], // Ensures valid installment
  },
  riskLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: [true, "Risk level is required"],
  },
  documents: {
    type: [String], // Array of file paths or Base64
    default: [],
    validate: {
      validator: function (docs) {
        return docs.every(
          (doc) =>
            /^data:[a-z]+\/[a-z]+;base64,/.test(doc) ||
            /^\/uploads\/.+/.test(doc)
        );
      },
      message: "Each document must be a valid Base64 string or file path",
    },
  },
  signature: {
    type: String, // Base64 string or file path
    required: [true, "Signature is required"],
    validate: {
      validator: function (sig) {
        return (
          /^data:image\/(png|jpeg|jpg);base64,/.test(sig) ||
          /^\/uploads\/.+/.test(sig)
        );
      },
      message: "Signature must be a valid Base64 image string or file path",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LoanApplication = mongoose.model(
  "LoanApplication",
  loanApplicationSchema
);

module.exports = LoanApplication;
