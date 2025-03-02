import React, { useState } from "react";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Ali Khan", role: "Borrower", email: "ali@example.com" },
    { id: 2, name: "Sara Ahmed", role: "Admin", email: "sara@example.com" },
    {
      id: 3,
      name: "Bilal Iqbal",
      role: "Borrower",
      email: "bilal@example.com",
    },
    { id: 4, name: "Ayesha Noor", role: "Admin", email: "ayesha@example.com" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Borrower",
  });

  const styles = {
    container: { padding: "20px", fontFamily: "Arial, sans-serif" },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    searchInput: {
      padding: "8px",
      width: "250px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    addButton: {
      padding: "8px 12px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
    th: { background: "#333", color: "white", padding: "10px" },
    td: {
      padding: "8px",
      marginTop: "5px",
      borderTop: "10px solid #ffffff",
      borderBottom: "1px solid #ddd",
      textAlign: "center",
    },
    editButton: {
      padding: "4px 8px",
      marginRight: "5px",
      backgroundColor: "#007BFF",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "13px",
    },
    deleteButton: {
      padding: "4px 8px",
      backgroundColor: "#DC3545",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "13px",
    },
    roleBadge: {
      // padding: "5px 10px",
      borderRadius: "1px",
      fontWeight: "bold",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      width: "300px",
      textAlign: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    },
    modalInput: {
      width: "90%",
      padding: "8px",
      margin: "8px 0",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    modalButton: {
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      marginTop: "10px",
    },
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      if (editingUser) {
        setUsers(
          users.map((user) => (user.id === editingUser.id ? newUser : user))
        );
      } else {
        setUsers([...users, { id: users.length + 1, ...newUser }]);
      }
      setShowModal(false);
      setEditingUser(null);
      setNewUser({ name: "", email: "", role: "Borrower" });
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
    setShowModal(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", color: "#333" }}>👥 Manage Users</h2>
      {/* Header */}
      <div style={styles.header}>
        <input
          type="text"
          placeholder="🔍 Search users..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button style={styles.addButton} onClick={() => setShowModal(true)}>
          ➕ {editingUser ? "Edit User" : "Add New User"}
        </button>
      </div>

      {/* Users Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td
                  style={{
                    ...styles.td,
                    ...styles.roleBadge,
                    backgroundColor:
                      user.role === "Admin" ? "#007BFF" : "#FFC107",
                    color: "white",
                  }}
                >
                  {user.role}
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.editButton}
                    onClick={() => handleEditUser(user)}
                  >
                    ✏ Edit
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(user.id)}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Add/Edit User Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>{editingUser ? "✏ Edit User" : "➕ Add New User"}</h3>
            <input
              type="text"
              placeholder="Enter Name"
              style={styles.modalInput}
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Enter Email"
              style={styles.modalInput}
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <select
              style={styles.modalInput}
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="Borrower">Borrower</option>
              <option value="Admin">Admin</option>
            </select>
            <button
              style={{
                ...styles.modalButton,
                backgroundColor: "#28a745",
                color: "white",
              }}
              onClick={handleAddUser}
            >
              ✅ {editingUser ? "Save Changes" : "Add"}
            </button>
            <button
              style={{
                ...styles.modalButton,
                backgroundColor: "#DC3545",
                color: "white",
                marginLeft: "10px",
              }}
              onClick={() => setShowModal(false)}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
