import React, { useState } from "react";
import { format } from "date-fns";

const loans = [
  {
    id: 1,
    borrower: "Ali Khan",
    totalInstallments: 12,
    paidInstallments: 5,
    loanAmount: 50000,
    interestAmount: 5000,
    interestPercentage: 10,
    penaltiesAmount: 2000,
    penaltiesPercentage: 4,
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    adminResponse: "Approved with flexible payment terms",
    installments: [
      {
        month: "Jan 2024",
        amount: 4500,
        balance: 45500,
        transactionMethod: "Bank Transfer",
      },
      {
        month: "Feb 2024",
        amount: 4500,
        balance: 41000,
        transactionMethod: "Credit Card",
      },
      {
        month: "Mar 2024",
        amount: 4500,
        balance: 36500,
        transactionMethod: "Bank Transfer",
      },
      {
        month: "Apr 2024",
        amount: 4500,
        balance: 32000,
        transactionMethod: "UPI",
      },
      {
        month: "May 2024",
        amount: 4500,
        balance: 27500,
        transactionMethod: "Bank Transfer",
      },
    ],
  },
];

const ActiveLoans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Active Loans</h2>
      {loans.map((loan) => {
        const remainingInstallments =
          loan.totalInstallments - loan.paidInstallments;
        return (
          <div
            key={loan.id}
            style={{
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "16px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
              Borrower: {loan.borrower}
            </h3>
            <p>
              <strong>Loan Amount:</strong> ${loan.loanAmount}
            </p>
            <p>
              <strong>Interest Amount:</strong> ${loan.interestAmount} (
              {loan.interestPercentage}%)
            </p>
            <p>
              <strong>Penalties:</strong> ${loan.penaltiesAmount} (
              {loan.penaltiesPercentage}%)
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <p>
                <strong>Start Date:</strong>{" "}
                {format(new Date(loan.startDate), "PPP")}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {format(new Date(loan.endDate), "PPP")}
              </p>
            </div>
            <div style={{ marginTop: "8px" }}>
              <p>
                <strong>Installments Paid:</strong> {loan.paidInstallments} /{" "}
                {loan.totalInstallments}
              </p>
              <div
                style={{
                  height: "8px",
                  background: "#ddd",
                  borderRadius: "4px",
                  marginTop: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${
                      (loan.paidInstallments / loan.totalInstallments) * 100
                    }%`,
                    height: "100%",
                    background: "#4caf50",
                  }}
                ></div>
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  padding: "4px 8px",
                  background: "#007bff",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                Remaining: {remainingInstallments}
              </span>
            </div>
            <div style={{ marginTop: "8px", color: "#555" }}>
              <strong>Admin Response:</strong> {loan.adminResponse}
            </div>
            <button
              style={{
                marginTop: "16px",
                width: "100%",
                padding: "10px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedLoan(loan)}
            >
              View Details
            </button>
          </div>
        );
      })}

      {selectedLoan && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Loan Details</h3>
          <p>
            <strong>Borrower:</strong> {selectedLoan.borrower}
          </p>
          <p>
            <strong>Loan Amount:</strong> ${selectedLoan.loanAmount}
          </p>
          <p>
            <strong>Interest Amount:</strong> ${selectedLoan.interestAmount} (
            {selectedLoan.interestPercentage}%)
          </p>
          <p>
            <strong>Penalties:</strong> ${selectedLoan.penaltiesAmount} (
            {selectedLoan.penaltiesPercentage}%)
          </p>
          {/* <p>
            <strong>Start Date:</strong>{" "}
            {format(new Date(selectedLoan.startDate), "PPP")}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {format(new Date(selectedLoan.endDate), "PPP")}
          </p> */}
          {/* <p>
            <strong>Installments Paid:</strong> {selectedLoan.paidInstallments}{" "}
            / {selectedLoan.totalInstallments}
          </p> */}
          <h4>Installment Details</h4>
          {/* Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "8px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#007bff",
                  color: "white",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Month
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Amount Paid
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Remaining Balance
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Transaction Mode
                </th>
              </tr>
            </thead>
            <tbody>
              {loans[0].installments.map((installment, index) => (
                <tr
                  key={index}
                  style={{
                    textAlign: "left",
                    background: index % 2 === 0 ? "#f9f9f9" : "white",
                  }}
                >
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    {installment.month}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    {installment.amount} PKR
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    {installment.balance} PKR
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    {installment.transactionMethod}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            style={{
              marginTop: "12px",
              padding: "10px",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => setSelectedLoan(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ActiveLoans;
