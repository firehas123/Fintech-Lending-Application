import React, { useState } from "react";

const LoanApplications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Ali Khan",
      location: "Lahore",
      govId: "CNIC-12345",
      duration: "5 Years",
      interestRate: "12%",
      status: "Pending",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      location: "Karachi",
      govId: "CNIC-67890",
      duration: "3 Years",
      interestRate: "10%",
      status: "Pending",
    },
    {
      id: 3,
      name: "Bilal Iqbal",
      location: "Islamabad",
      govId: "CNIC-11122",
      duration: "7 Years",
      interestRate: "14%",
      status: "Pending",
    },
    {
      id: 4,
      name: "Ayesha Noor",
      location: "Faisalabad",
      govId: "CNIC-33445",
      duration: "2 Years",
      interestRate: "9%",
      status: "Pending",
    },
  ]);

  const styles = {
    container: { padding: "20px", fontFamily: "Arial, sans-serif" },
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
    },
    approveButton: { backgroundColor: "#28a745", color: "white" },
    declineButton: { backgroundColor: "#DC3545", color: "white" },
    pendingStatus: { color: "#FFA500", fontWeight: "bold" },
    approvedStatus: { color: "#28a745", fontWeight: "bold" },
    declinedStatus: { color: "#DC3545", fontWeight: "bold" },
  };

  const handleApproval = (id) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: "Approved ✅" } : app
      )
    );
  };

  const handleDecline = (id) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: "Declined ❌" } : app
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        📄 Loan Applications ({applications.length})
      </h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Government ID</th>
            <th style={styles.th}>Loan Duration</th>
            <th style={styles.th}>Interest Rate</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td style={styles.td}>{app.name}</td>
              <td style={styles.td}>{app.location}</td>
              <td style={styles.td}>{app.govId}</td>
              <td style={styles.td}>{app.duration}</td>
              <td style={styles.td}>{app.interestRate}</td>
              <td
                style={{
                  ...styles.td,
                  ...(app.status === "Approved ✅"
                    ? styles.approvedStatus
                    : app.status === "Declined ❌"
                    ? styles.declinedStatus
                    : styles.pendingStatus),
                }}
              >
                {app.status}
              </td>
              <td style={styles.td}>
                <div style={styles.buttonContainer}>
                  <button
                    style={{ ...styles.button, ...styles.approveButton }}
                    onClick={() => handleApproval(app.id)}
                    disabled={app.status !== "Pending"}
                  >
                    ✅ Approve
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.declineButton }}
                    onClick={() => handleDecline(app.id)}
                    disabled={app.status !== "Pending"}
                  >
                    ❌ Decline
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanApplications;
