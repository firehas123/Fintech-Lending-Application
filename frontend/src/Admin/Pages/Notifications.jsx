import React, { useState } from "react";

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      message: "Your loan application has been approved!",
      type: "success",
      user: "Ali Khan",
      date: "2024-08-01",
    },
    {
      id: 2,
      message: "Your loan is overdue! Please pay immediately.",
      type: "warning",
      user: "Bilal Iqbal",
      date: "2024-08-05",
    },
    {
      id: 3,
      message: "Loan disbursed successfully.",
      type: "info",
      user: "Sara Ahmed",
      date: "2024-08-10",
    },
    {
      id: 4,
      message: "Your loan application has been declined.",
      type: "error",
      user: "Ayesha Noor",
      date: "2024-08-15",
    },
    {
      id: 5,
      message: "New loan repayment received.",
      type: "info",
      user: "Hamza Sheikh",
      date: "2024-08-20",
    },
  ]);

  const [smsPopup, setSmsPopup] = useState({
    open: false,
    user: "",
    message: "",
    type: "General",
  });

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "auto",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    },
    header: { textAlign: "center", color: "#333", marginBottom: "20px" },
    list: { listStyle: "none", padding: 0 },
    notification: (type) => ({
      padding: "15px",
      margin: "10px 0",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      backgroundColor:
        type === "success"
          ? "#d4edda"
          : type === "warning"
          ? "#fff3cd"
          : type === "info"
          ? "#d1ecf1"
          : "#f8d7da",
      color:
        type === "success"
          ? "#155724"
          : type === "warning"
          ? "#856404"
          : type === "info"
          ? "#0c5460"
          : "#721c24",
    }),
    button: {
      padding: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      borderRadius: "5px",
      marginLeft: "5px",
    },
    emailButton: { backgroundColor: "#007bff", color: "white" },
    smsButton: { backgroundColor: "#28a745", color: "white" },
    popup: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
      width: "300px",
      textAlign: "center",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
    },
    input: {
      width: "100%",
      padding: "8px",
      margin: "5px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
  };

  const openSmsPopup = (user) => {
    setSmsPopup({ open: true, user, message: "", type: "General" });
  };

  const closeSmsPopup = () => {
    setSmsPopup({ open: false, user: "", message: "", type: "General" });
  };

  const sendSms = () => {
    alert(
      `📩 SMS sent to ${smsPopup.user}\n📜 Message: ${smsPopup.message}\n📌 Type: ${smsPopup.type}`
    );
    closeSmsPopup();
  };

  const sendEmail = (user) => {
    const subject = encodeURIComponent("Loan Notification");
    const body = encodeURIComponent(
      `Dear ${user},\n\nThis is an important loan update. Please check your account for details.\n\nThank you.`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📢 Loan Notifications</h2>
      <ul style={styles.list}>
        {notifications.map((notif) => (
          <li key={notif.id} style={styles.notification(notif.type)}>
            <span>
              {notif.user}: {notif.message}
            </span>
            <div>
              <button
                style={{ ...styles.button, ...styles.emailButton }}
                onClick={() => sendEmail(notif.user)}
              >
                Send Email
              </button>
              <button
                style={{ ...styles.button, ...styles.smsButton }}
                onClick={() => openSmsPopup(notif.user)}
              >
                Send SMS
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* SMS Popup */}
      {smsPopup.open && (
        <>
          <div style={styles.overlay} onClick={closeSmsPopup}></div>
          <div style={styles.popup}>
            <h3>📩 Send SMS to {smsPopup.user}</h3>
            <select
              style={styles.input}
              value={smsPopup.type}
              onChange={(e) =>
                setSmsPopup({ ...smsPopup, type: e.target.value })
              }
            >
              <option value="General">General</option>
              <option value="Overdue Warning">Overdue Warning</option>
              <option value="Approval Notice">Approval Notice</option>
              <option value="Decline Notice">Decline Notice</option>
            </select>
            <textarea
              style={styles.input}
              rows="3"
              placeholder="Enter message..."
              value={smsPopup.message}
              onChange={(e) =>
                setSmsPopup({ ...smsPopup, message: e.target.value })
              }
            ></textarea>
            <button
              style={{
                ...styles.button,
                ...styles.emailButton,
                marginTop: "10px",
              }}
              onClick={sendSms}
            >
              Send
            </button>
            <button
              style={{
                ...styles.button,
                backgroundColor: "#dc3545",
                color: "white",
                marginTop: "10px",
                marginLeft: "10px",
              }}
              onClick={closeSmsPopup}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
