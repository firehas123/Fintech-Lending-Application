import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import DashboardHome from "./PagesForBorrower/DashboardHome";
import ApplyLoan from "./PagesForBorrower/ApplyLoan";
import LoanHistory from "./PagesForBorrower/LoanHistory";
import Payments from "./PagesForBorrower/Payments";

import ProfileDocuments from "./PagesForBorrower/ProfileDocuments";
import Notifications from "./PagesForBorrower/Notifications";

const BorrowerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f4f4f4",
    },
    sidebar: {
      width: sidebarOpen ? "250px" : "80px",
      background: "#222",
      // height: "100vh",
      color: "#fff",
      transition: "0.3s",
      padding: "20px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    menuButton: {
      fontSize: "24px",
      cursor: "pointer",
      background: "none",
      border: "none",
      color: "#fff",
    },
    sidebarItem: (isActive) => ({
      display: "flex",
      alignItems: "center",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      marginBottom: "10px",
      transition: "0.3s",
      background: isActive ? "#444" : "#333",
      color: isActive ? "#ffcc00" : "white",
    }),
    content: { flex: 1, padding: "20px" },
    profileIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#222",
      fontWeight: "bold",
      position: "relative",
      cursor: "pointer",
    },
    onlineIndicator: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: "green",
      position: "absolute",
      bottom: "2px",
      right: "2px",
      border: "2px solid white",
    },
    profilePopup: {
      position: "absolute",
      top: "60px",
      left: "20px",
      background: "#fff",
      color: "#222",
      padding: "15px",
      borderRadius: "5px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      width: "200px",
    },
  };

  const menuItems = [
    { name: "🏠 Dashboard", path: "/user-pannel/" },
    { name: "📝 Apply for Loan", path: "/user-pannel/apply-loan" },
    { name: "📜 Loan History", path: "/user-pannel/loan-history" },
    { name: "💳 Payments & Repayments", path: "/user-pannel/payments" },
    { name: "🔔 Notifications & Alerts", path: "/user-pannel/notifications" },
    { name: "📂 Profile & Documents", path: "/user-pannel/profile-documents" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.topBar}>
          <div onClick={() => setShowProfile(!showProfile)}>
            <div style={styles.profileIcon}>
              👤
              <div style={styles.onlineIndicator}></div>
            </div>
          </div>
          <button
            style={styles.menuButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        {showProfile && (
          <div style={styles.profilePopup}>
            <h4>👤: Borrower</h4>
            <p>Email: user@demo.com</p>
            <p>Status: 🟢 Online</p>
          </div>
        )}

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div style={styles.sidebarItem(isActive)}>
                {sidebarOpen ? item.name : item.name.slice(0, 1)}
              </div>
            </Link>
          );
        })}
      </div>

      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="apply-loan" element={<ApplyLoan />} />
          <Route path="loan-history" element={<LoanHistory />} />
          <Route path="payments" element={<Payments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile-documents" element={<ProfileDocuments />} />
        </Routes>
      </div>
    </div>
  );
};

export default BorrowerDashboard;
