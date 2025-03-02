import React, { useState } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const LoanAlerts = () => {
  // Dummy alerts data
  const [alerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "Your next loan payment is due soon!",
      admin: {
        name: "John Doe",
        email: "admin@loancompany.com",
        phone: "+1 234 567 890",
      },
    },
    {
      id: 2,
      type: "error",
      message: "Overdue payment! Please clear immediately.",
      admin: {
        name: "Jane Smith",
        email: "finance@loancompany.com",
        phone: "+1 987 654 321",
      },
    },
    {
      id: 3,
      type: "success",
      message: "Your loan application has been approved!",
      admin: {
        name: "Michael Brown",
        email: "support@loancompany.com",
        phone: "+1 456 789 123",
      },
    },
  ]);

  // State to track selected alert for modal
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Styles
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "20px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    alert: (type) => ({
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.3s",
      ...(type === "warning" && {
        background: "#fff3cd",
        color: "#856404",
        border: "1px solid #ffeeba",
      }),
      ...(type === "error" && {
        background: "#f8d7da",
        color: "#721c24",
        border: "1px solid #f5c6cb",
      }),
      ...(type === "success" && {
        background: "#d4edda",
        color: "#155724",
        border: "1px solid #c3e6cb",
      }),
    }),
    modalOverlay: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "1000",
    },
    modalContent: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      width: "300px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
      position: "relative",
    },
    closeBtn: {
      background: "none",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
      position: "absolute",
      right: "10px",
      top: "10px",
    },
  };

  // Function to get alert icons
  const getIcon = (type) => {
    switch (type) {
      case "warning":
        return <WarningAmberIcon style={{ color: "#856404" }} />;
      case "error":
        return <ErrorIcon style={{ color: "#721c24" }} />;
      case "success":
        return <CheckCircleIcon style={{ color: "#155724" }} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", color: "#333" }}>
        📢 Notifications ({alerts.length})
      </h2>

      {/* List of Alerts */}
      {alerts.map((alert) => (
        <div
          key={alert.id}
          style={styles.alert(alert.type)}
          onClick={() => setSelectedAlert(alert)}
        >
          {getIcon(alert.type)}
          {alert.message}
        </div>
      ))}

      {/* Admin Details Modal */}
      {selectedAlert && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button
              style={styles.closeBtn}
              onClick={() => setSelectedAlert(null)}
            >
              <CloseIcon />
            </button>
            <h3>📌 Admin Details</h3>
            <p>
              <strong>Name:</strong> {selectedAlert.admin.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedAlert.admin.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedAlert.admin.phone}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanAlerts;
