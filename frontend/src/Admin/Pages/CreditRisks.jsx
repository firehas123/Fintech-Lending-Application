import React, { useState } from "react";

const CreditRisks = () => {
  const [borrowers, setBorrowers] = useState([
    {
      id: 1,
      name: "Ali Khan",
      loanAmount: 50000,
      creditScore: 750,
      risk: "Low",
      missedPayments: 1,
    },
    {
      id: 2,
      name: "Bilal Iqbal",
      loanAmount: 80000,
      creditScore: 620,
      risk: "Medium",
      missedPayments: 3,
    },
    {
      id: 3,
      name: "Sara Ahmed",
      loanAmount: 120000,
      creditScore: 540,
      risk: "High",
      missedPayments: 5,
    },
    {
      id: 4,
      name: "Ayesha Noor",
      loanAmount: 30000,
      creditScore: 790,
      risk: "Low",
      missedPayments: 0,
    },
    {
      id: 5,
      name: "Hamza Sheikh",
      loanAmount: 70000,
      creditScore: 680,
      risk: "Medium",
      missedPayments: 2,
    },
  ]);

  const adjustRisk = (id, newRisk) => {
    setBorrowers(
      borrowers.map((borrower) =>
        borrower.id === id ? { ...borrower, risk: newRisk } : borrower
      )
    );
  };

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "900px",
      margin: "auto",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      background: "#fff",
    },
    header: { textAlign: "center", color: "#333", marginBottom: "20px" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      background: "#007bff",
      color: "white",
      padding: "10px",
      textAlign: "left",
    },
    td: { padding: "10px", borderBottom: "1px solid #ddd" },
    lowRisk: {
      background: "#d4edda",
      color: "#155724",
      padding: "5px 10px",
      borderRadius: "5px",
    },
    mediumRisk: {
      background: "#fff3cd",
      color: "#856404",
      padding: "5px 10px",
      borderRadius: "5px",
    },
    highRisk: {
      background: "#f8d7da",
      color: "#721c24",
      padding: "5px 10px",
      borderRadius: "5px",
    },
    progressBarContainer: {
      width: "100%",
      background: "#ddd",
      borderRadius: "5px",
      height: "10px",
      overflow: "hidden",
    },
    progressBar: (score) => ({
      width: `${(score / 850) * 100}%`,
      height: "100%",
      background: score > 700 ? "#28a745" : score > 600 ? "#ffc107" : "#dc3545",
    }),
    button: {
      padding: "5px 10px",
      cursor: "pointer",
      fontWeight: "bold",
      borderRadius: "5px",
      margin: "5px",
      border: "none",
    },
    adjustButton: { background: "#17a2b8", color: "white" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📊 Credit Risk Management</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Borrower</th>
            <th style={styles.th}>Loan Amount (PKR)</th>
            <th style={styles.th}>Credit Score</th>
            <th style={styles.th}>Risk Level</th>
            <th style={styles.th}>Missed Payments</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrowers.map((borrower) => (
            <tr key={borrower.id}>
              <td style={styles.td}>{borrower.name}</td>
              <td style={styles.td}>{borrower.loanAmount.toLocaleString()}</td>
              <td style={styles.td}>
                <div style={styles.progressBarContainer}>
                  <div style={styles.progressBar(borrower.creditScore)}></div>
                </div>
                <span>{borrower.creditScore}/850</span>
              </td>
              <td style={styles.td}>
                <span
                  style={
                    borrower.risk === "Low"
                      ? styles.lowRisk
                      : borrower.risk === "Medium"
                      ? styles.mediumRisk
                      : styles.highRisk
                  }
                >
                  {borrower.risk}
                </span>
              </td>
              <td style={styles.td}>{borrower.missedPayments}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, ...styles.adjustButton }}
                  onClick={() =>
                    adjustRisk(
                      borrower.id,
                      borrower.risk === "Low"
                        ? "Medium"
                        : borrower.risk === "Medium"
                        ? "High"
                        : "Low"
                    )
                  }
                >
                  Adjust Risk
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditRisks;
