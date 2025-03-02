import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import LoanApplications from "./Pages/LoanApplications";
import Loans from "./Pages/Loans";
import Repayments from "./Pages/Repayments";
import LoanReports from "./Pages/LaonReports";
import Notifications from "./Pages/Notifications";
import CreditRisks from "./Pages/CreditRisks";
import SystemSettings from "./Pages/SystemSettings";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation(); // Hook to get the current route

  const styles = {
    container: { display: "flex", height: "100%", backgroundColor: "#f4f4f4" },
    sidebar: {
      width: sidebarOpen ? "250px" : "60px",
      background: "#222",
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
      background: isActive ? "#444" : "#333", // Highlight active item
      color: isActive ? "#ffcc00" : "white", // Change text color if active
    }),
    content: { flex: 1, padding: "20px" },
    header: {
      background: "#fff",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    profileContainer: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
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
    { name: "🏠 Home", path: "/dashboard/" },
    { name: "👥 Users", path: "/dashboard/users" },
    { name: "📜 Loan Applications", path: "/dashboard/loan-applications" },
    { name: "💰 Loans", path: "/dashboard/loans" },
    { name: "🔄 Repayments", path: "/dashboard/repayments" },
    { name: "📊 Reports", path: "/dashboard/reports" },
    { name: "📢 Notifications", path: "/dashboard/notifications" },
    { name: "📈 Credit Risk", path: "/dashboard/credit-risk-management" },
    { name: "⚙ Settings", path: "/dashboard/settings" },
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Top Bar (Profile & Menu Button) */}
        <div style={styles.topBar}>
          {/* Profile Icon */}
          <div
            style={styles.profileContainer}
            onClick={() => setShowProfile(!showProfile)}
          >
            <div style={styles.profileIcon}>
              👤
              <div style={styles.onlineIndicator}></div>
            </div>
            {sidebarOpen && <span>Admin</span>}
          </div>

          {/* Sidebar Toggle Button */}
          <button
            style={styles.menuButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        {/* Profile Details Popup */}
        {showProfile && (
          <div style={styles.profilePopup}>
            <h4>👤 Admin</h4>
            <p>Email: admin@example.com</p>
            <p>Role: Super Admin</p>
            <p>Status: 🟢 Online</p>
          </div>
        )}

        {/* Sidebar Menu */}
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path; // Check if active
          return (
            <Link
              key={item.name}
              to={item.path}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div style={styles.sidebarItem(isActive)}>
                {sidebarOpen ? item.name : item.name[0]}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <h2>Admin Dashboard</h2>
          <button
            style={{
              padding: "8px 15px",
              background: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div style={{ marginTop: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="loan-applications" element={<LoanApplications />} />
            <Route path="loans" element={<Loans />} />
            <Route path="repayments" element={<Repayments />} />
            <Route path="reports" element={<LoanReports />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="credit-risk-management" element={<CreditRisks />} />
            <Route path="settings" element={<SystemSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
