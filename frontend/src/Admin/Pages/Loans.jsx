import React, { useState } from "react";

const Loans = () => {
  const [loans, setLoans] = useState([
    {
      id: 1,
      borrower: "Ali Khan",
      amount: "500,000 PKR",
      duration: "5 Years",
      interestRate: "12%",
      status: "Pending Disbursement",
    },
    {
      id: 2,
      borrower: "Sara Ahmed",
      amount: "300,000 PKR",
      duration: "3 Years",
      interestRate: "10%",
      status: "Disbursed",
    },
    {
      id: 3,
      borrower: "Bilal Iqbal",
      amount: "700,000 PKR",
      duration: "7 Years",
      interestRate: "14%",
      status: "Pending Disbursement",
    },
    {
      id: 4,
      borrower: "Ayesha Noor",
      amount: "250,000 PKR",
      duration: "2 Years",
      interestRate: "9%",
      status: "Repaid",
    },
  ]);

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "900px",
      margin: "auto",
    },
    header: { textAlign: "center", color: "#333", marginBottom: "20px" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
    th: {
      background: "#333",
      color: "white",
      padding: "10px",
      textAlign: "center",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      textAlign: "center",
    },
    buttonContainer: { display: "flex", justifyContent: "center", gap: "10px" },
    button: {
      padding: "6px 12px",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "14px",
      maxWidth: "100px",
    },
    disburseButton: { backgroundColor: "#007bff", color: "white" },
    repayButton: { backgroundColor: "#28a745", color: "white" },
    statusPending: { color: "#FFA500", fontWeight: "bold" },
    statusDisbursed: { color: "#007bff", fontWeight: "bold" },
    statusRepaid: { color: "#28a745", fontWeight: "bold" },
  };

  const handleDisbursement = (id) => {
    setLoans(
      loans.map((loan) =>
        loan.id === id ? { ...loan, status: "Disbursed" } : loan
      )
    );
  };

  const handleRepayment = (id) => {
    setLoans(
      loans.map((loan) =>
        loan.id === id ? { ...loan, status: "Repaid" } : loan
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>💰 Loan Management</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Borrower</th>
            <th style={styles.th}>Loan Amount</th>
            <th style={styles.th}>Duration</th>
            <th style={styles.th}>Interest Rate</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td style={styles.td}>{loan.borrower}</td>
              <td style={styles.td}>{loan.amount}</td>
              <td style={styles.td}>{loan.duration}</td>
              <td style={styles.td}>{loan.interestRate}</td>
              <td
                style={{
                  ...styles.td,
                  ...(loan.status === "Disbursed"
                    ? styles.statusDisbursed
                    : loan.status === "Repaid"
                    ? styles.statusRepaid
                    : styles.statusPending),
                }}
              >
                {loan.status}
              </td>
              <td style={styles.td}>
                <div style={styles.buttonContainer}>
                  {loan.status === "Pending Disbursement" && (
                    <button
                      style={{ ...styles.button, ...styles.disburseButton }}
                      onClick={() => handleDisbursement(loan.id)}
                    >
                      🔄 Disburse !!!
                    </button>
                  )}
                  {loan.status === "Disbursed" && (
                    <button
                      style={{ ...styles.button, ...styles.repayButton }}
                      onClick={() => handleRepayment(loan.id)}
                    >
                      ✅ Mark as Repaid
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Loans;
