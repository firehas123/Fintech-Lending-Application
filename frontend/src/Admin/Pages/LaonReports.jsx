import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const LoanReports = () => {
  const [loans, setLoans] = useState([
    {
      id: 1,
      borrower: "Ali Khan",
      amount: 500000,
      paid: 200000,
      remaining: 300000,
      status: "Pending",
      issued: "Jan",
      interest: 5,
    },
    {
      id: 2,
      borrower: "Sara Ahmed",
      amount: 300000,
      paid: 300000,
      remaining: 0,
      status: "Paid",
      issued: "Feb",
      interest: 4,
    },
    {
      id: 3,
      borrower: "Bilal Iqbal",
      amount: 700000,
      paid: 500000,
      remaining: 200000,
      status: "Overdue",
      issued: "Mar",
      interest: 6,
    },
    {
      id: 4,
      borrower: "Ayesha Noor",
      amount: 250000,
      paid: 150000,
      remaining: 100000,
      status: "Pending",
      issued: "Apr",
      interest: 5,
    },
    {
      id: 5,
      borrower: "Usman Farooq",
      amount: 450000,
      paid: 250000,
      remaining: 200000,
      status: "Pending",
      issued: "May",
      interest: 5,
    },
    {
      id: 6,
      borrower: "Zara Malik",
      amount: 350000,
      paid: 350000,
      remaining: 0,
      status: "Paid",
      issued: "Jun",
      interest: 4,
    },
    {
      id: 7,
      borrower: "Hamza Sheikh",
      amount: 600000,
      paid: 400000,
      remaining: 200000,
      status: "Overdue",
      issued: "Jul",
      interest: 6,
    },
    {
      id: 8,
      borrower: "Mehreen Aslam",
      amount: 550000,
      paid: 450000,
      remaining: 100000,
      status: "Pending",
      issued: "Aug",
      interest: 5,
    },
  ]);

  const [selectedLoan, setSelectedLoan] = useState(null);

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "900px",
      margin: "auto",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
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
      cursor: "pointer",
    },
    overdueText: { color: "red", fontWeight: "bold" },
    pendingText: { color: "#FFA500", fontWeight: "bold" },
    paidText: { color: "#007bff", fontWeight: "bold" },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      backgroundColor: "#fff",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
      borderRadius: "8px",
      zIndex: 1000,
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      zIndex: 999,
    },
    closeButton: {
      marginTop: "10px",
      padding: "10px",
      border: "none",
      background: "#dc3545",
      color: "white",
      cursor: "pointer",
      borderRadius: "5px",
    },
  };

  const handleRowClick = (loan) => {
    setSelectedLoan(loan);
  };

  const handleCloseModal = () => {
    setSelectedLoan(null);
  };

  // Dummy Data for Chart (8 months)
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Loan Issued",
        data: [500000, 300000, 700000, 250000, 450000, 350000, 600000, 550000],
        borderColor: "#007bff",
        fill: false,
      },
      {
        label: "Loan Repaid",
        data: [200000, 300000, 500000, 150000, 250000, 350000, 400000, 450000],
        borderColor: "#28a745",
        fill: false,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📊 Loan Reports</h2>

      <h3 style={styles.header}>📌 Loan Records</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Borrower</th>
            <th style={styles.th}>Loan Amount</th>
            <th style={styles.th}>Paid Amount</th>
            <th style={styles.th}>Remaining</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id} onClick={() => handleRowClick(loan)}>
              <td style={styles.td}>{loan.borrower}</td>
              <td style={styles.td}>{loan.amount.toLocaleString()} PKR</td>
              <td style={styles.td}>{loan.paid.toLocaleString()} PKR</td>
              <td style={styles.td}>{loan.remaining.toLocaleString()} PKR</td>
              <td
                style={{
                  ...styles.td,
                  ...(loan.status === "Overdue"
                    ? styles.overdueText
                    : loan.status === "Pending"
                    ? styles.pendingText
                    : styles.paidText),
                }}
              >
                {loan.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLoan && (
        <>
          <div style={styles.overlay} onClick={handleCloseModal}></div>
          <div style={styles.modal}>
            <h3>Loan Details</h3>
            <p>
              <b>Borrower:</b> {selectedLoan.borrower}
            </p>
            <p>
              <b>Loan Amount:</b> {selectedLoan.amount.toLocaleString()} PKR
            </p>
            <p>
              <b>Paid Amount:</b> {selectedLoan.paid.toLocaleString()} PKR
            </p>
            <p>
              <b>Remaining Balance:</b>{" "}
              {selectedLoan.remaining.toLocaleString()} PKR
            </p>
            <p>
              <b>Interest Rate:</b> {selectedLoan.interest}%
            </p>
            <p>
              <b>Issued Month:</b> {selectedLoan.issued}
            </p>
            <button style={styles.closeButton} onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </>
      )}

      <h3 style={styles.header}>📈 Monthly Loan Report</h3>
      <Line data={chartData} />
    </div>
  );
};

export default LoanReports;
