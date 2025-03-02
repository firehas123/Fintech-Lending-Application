import React, { useState } from "react";

const SystemSettings = () => {
  // Loan terms state
  const [loanTerms, setLoanTerms] = useState([
    { id: 1, name: "Short-Term", interest: 5.5, duration: 12, penalty: 2.5 },
    { id: 2, name: "Mid-Term", interest: 6.5, duration: 24, penalty: 3.0 },
    { id: 3, name: "Long-Term", interest: 7.5, duration: 36, penalty: 4.0 },
  ]);
  const [newLoan, setNewLoan] = useState({
    name: "",
    interest: "",
    duration: "",
    penalty: "",
  });

  // User roles state
  const [roles, setRoles] = useState(["Admin", "Borrower", "Loan Officer"]);
  const [newRole, setNewRole] = useState("");

  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    dataBackup: true,
  });

  // Function to add a loan term
  const addLoanTerm = () => {
    if (
      !newLoan.name ||
      !newLoan.interest ||
      !newLoan.duration ||
      !newLoan.penalty
    ) {
      alert("Please fill all fields!");
      return;
    }
    setLoanTerms([...loanTerms, { id: loanTerms.length + 1, ...newLoan }]);
    setNewLoan({ name: "", interest: "", duration: "", penalty: "" });
  };

  // Function to remove a loan term
  const removeLoanTerm = (id) => {
    setLoanTerms(loanTerms.filter((term) => term.id !== id));
  };

  // Function to toggle system settings
  const toggleSetting = (key) => {
    setSystemSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Function to add a new role
  const addRole = () => {
    if (!newRole.trim()) {
      alert("Role name cannot be empty!");
      return;
    }
    setRoles([...roles, newRole.trim()]);
    setNewRole("");
  };

  // Function to remove a role
  const removeRole = (roleToRemove) => {
    setRoles(roles.filter((role) => role !== roleToRemove));
  };

  // Styles for UI components
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "900px",
      margin: "auto",
      fontFamily: "Arial, sans-serif",
      background: "#fff",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      borderRadius: "10px",
    },
    section: {
      padding: "15px",
      marginBottom: "15px",
      borderRadius: "8px",
      background: "#f9f9f9",
      border: "1px solid #ddd",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "8px",
      marginBottom: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    button: (bgColor) => ({
      padding: "8px 12px",
      marginRight: "5px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      background: bgColor,
      color: "white",
      maxWidth: "200px",
    }),
    toggleButton: (enabled) => ({
      background: enabled ? "#28a745" : "#dc3545",
      color: "white",
      padding: "6px 12px",
      border: "none",
      borderRadius: "5px",
      minWidth: "150px",
      cursor: "pointer",
    }),
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", color: "#333" }}>⚙️ System Settings</h2>

      {/* Loan Terms */}
      <div style={styles.section}>
        <h3 style={styles.title}>📑 Loan Terms</h3>
        <div>
          {loanTerms.map((term) => (
            <div
              key={term.id}
              style={{
                marginBottom: "5px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                background: "#eef",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                {term.name} - {term.interest}% Interest, {term.duration} months,{" "}
                {term.penalty}% Penalty
              </span>
              <button
                style={styles.button("#dc3545")}
                onClick={() => removeLoanTerm(term.id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Loan Name"
          style={styles.input}
          value={newLoan.name}
          onChange={(e) => setNewLoan({ ...newLoan, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          style={styles.input}
          value={newLoan.interest}
          onChange={(e) => setNewLoan({ ...newLoan, interest: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duration (Months)"
          style={styles.input}
          value={newLoan.duration}
          onChange={(e) => setNewLoan({ ...newLoan, duration: e.target.value })}
        />
        <input
          type="number"
          placeholder="Penalty (%)"
          style={styles.input}
          value={newLoan.penalty}
          onChange={(e) => setNewLoan({ ...newLoan, penalty: e.target.value })}
        />
        <button style={styles.button("#28a745")} onClick={addLoanTerm}>
          ➕ Add Loan Term
        </button>
      </div>

      {/* Manage Roles */}
      <div style={styles.section}>
        <h3 style={styles.title}>👥 Manage Roles</h3>
        {roles.map((role, index) => (
          <div
            key={index}
            style={{
              marginBottom: "5px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              background: "#eef",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{role}</span>
            <button
              style={styles.button("#dc3545")}
              onClick={() => removeRole(role)}
            >
              ❌ Remove
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder="New Role Name"
          style={styles.input}
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button style={styles.button("#28a745")} onClick={addRole}>
          ➕ Add Role
        </button>
      </div>

      {/* System Settings */}
      <div style={styles.section}>
        <h3 style={styles.title}>🔧 System Settings</h3>
        {Object.entries(systemSettings).map(([key, value]) => (
          <div key={key} style={{ marginBottom: "10px" }}>
            <label>{key.replace(/([A-Z])/g, " $1")}: </label>
            <button
              style={styles.toggleButton(value)}
              onClick={() => toggleSetting(key)}
            >
              {value ? "Enabled ✅" : "Disabled ❌"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemSettings;
