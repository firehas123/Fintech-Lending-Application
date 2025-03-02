const mongoose = require("mongoose");

const loanOffersSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      //for limited offers
      enum: [
        "Personal Loan",
        "Business Loan",
        "Home Loan",
        "Car Loan",
        "Education Loan",
        "Medical Loan",
        "Vacation Loan",
        "Renovation Loan",
        "Debt Consolidation",
        "Wedding Loan",
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // in months
      required: true,
    },
    interest: {
      type: Number, // in percentage
      required: true,
    },
    penalty: {
      type: String, // storing as string since it's a percentage
      required: true,
    },
    monthlyInstallment: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const LoanOffers = mongoose.model("LoanOffers", loanOffersSchema);

module.exports = LoanOffers;
