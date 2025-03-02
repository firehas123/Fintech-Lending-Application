import React, { useState } from "react";

const Repayments = () => {
  const [loans, setLoans] = useState([
    {
      id: 1,
      borrower: "Ali Khan",
      amount: "500,000 PKR",
      dueDate: "2024-12-15",
      paidAmount: "200,000 PKR",
      remaining: "300,000 PKR",
      status: "Pending",
    },
    {
      id: 2,
      borrower: "Sara Ahmed",
      amount: "300,000 PKR",
      dueDate: "2024-11-10",
      paidAmount: "300,000 PKR",
      remaining: "0 PKR",
      status: "Paid",
    },
    {
      id: 3,
      borrower: "Bilal Iqbal",
      amount: "700,000 PKR",
      dueDate: "2024-08-20",
      paidAmount: "500,000 PKR",
      remaining: "200,000 PKR",
      status: "Overdue",
    },
    {
      id: 4,
      borrower: "Ayesha Noor",
      amount: "250,000 PKR",
      dueDate: "2024-09-25",
      paidAmount: "150,000 PKR",
      remaining: "100,000 PKR",
      status: "Pending",
    },
  ]);

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1000px",
      margin: "auto",
    },
    header: { textAlign: "center", color: "#333", marginBottom: "20px" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
    th: {
      background: "#333",
      color: "white",
      padding: "12px",
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
    },
    payButton: { backgroundColor: "#28a745", color: "white" },
    overdueStatus: { color: "red", fontWeight: "bold" },
    pendingStatus: { color: "#FFA500", fontWeight: "bold" },
    paidStatus: { color: "#007bff", fontWeight: "bold" },
  };

  const handleRepayment = (id) => {
    setLoans(
      loans.map((loan) =>
        loan.id === id ? { ...loan, status: "Paid", remaining: "0 PKR" } : loan
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>💳 Loan Repayments</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Borrower</th>
            <th style={styles.th}>Loan Amount</th>
            <th style={styles.th}>Due Date</th>
            <th style={styles.th}>Paid Amount</th>
            <th style={styles.th}>Remaining</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td style={styles.td}>{loan.borrower}</td>
              <td style={styles.td}>{loan.amount}</td>
              <td style={styles.td}>{loan.dueDate}</td>
              <td style={styles.td}>{loan.paidAmount}</td>
              <td style={styles.td}>{loan.remaining}</td>
              <td
                style={{
                  ...styles.td,
                  ...(loan.status === "Overdue"
                    ? styles.overdueStatus
                    : loan.status === "Pending"
                    ? styles.pendingStatus
                    : styles.paidStatus),
                }}
              >
                {loan.status}
              </td>
              <td style={styles.td}>
                <div style={styles.buttonContainer}>
                  {loan.status !== "Paid" && (
                    <button
                      style={{ ...styles.button, ...styles.payButton }}
                      onClick={() => handleRepayment(loan.id)}
                    >
                      ✅ Mark as Paid
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

export default Repayments;
