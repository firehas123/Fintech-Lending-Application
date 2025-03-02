import React from "react";

const BorrowerDashboard = () => {
  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    section: {
      background: "#fff",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "15px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    title: { fontSize: "18px", fontWeight: "bold", marginBottom: "10px" },
    loanSummary: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      background: "#f1f1f1",
      borderRadius: "5px",
    },
    notification: {
      padding: "10px",
      background: "#ffe5e5",
      borderLeft: "4px solid red",
      borderRadius: "5px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Overview Section */}
      <div style={styles.section}>
        <h3 style={styles.title}>Loan Overview</h3>
        <div style={styles.loanSummary}>
          <div>
            📌 Active Loans: <strong>3</strong>
          </div>
          <div>
            🕒 Pending Loans: <strong>2</strong>
          </div>
          <div>
            ✅ Paid Loans: <strong>5</strong>
          </div>
        </div>
      </div>

      {/* Loan Status Summary */}
      <div style={styles.section}>
        <h3 style={styles.title}>Loan Status Summary</h3>
        <p>
          ✔ Approved Loans: <strong>4</strong>
        </p>
        <p>
          ❌ Rejected Loans: <strong>1</strong>
        </p>
        <p>
          💸 Repayment Completed: <strong>3</strong>
        </p>
        <p>
          📅 Due Repayments: <strong>2</strong>
        </p>
      </div>

      {/* Repayment Reminders & Notifications */}
      <div style={styles.section}>
        <h3 style={styles.title}>Repayment Reminders & Notifications</h3>
        <div style={styles.notification}>
          ⚠ Your next repayment of $500 is due on <strong>15th Feb 2025</strong>
          .
        </div>
        <div style={styles.notification}>
          🔔 Loan #1023 is overdue. Please make the payment to avoid penalties.
        </div>
      </div>
    </div>
  );
};

export default BorrowerDashboard;
