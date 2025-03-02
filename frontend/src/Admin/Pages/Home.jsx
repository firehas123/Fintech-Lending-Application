import React from "react";

const Home = () => {
  const data = {
    loanStatuses: {
      approved: 120,
      pending: 45,
      rejected: 30,
    },
    overdueLoans: 15,
    revenue: "$50,000",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <h1 style={{ textAlign: "center", color: "#333" }}>🏠 Home</h1>

      {/* Dashboard Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* Loan Statuses */}
        <div
          style={{
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ color: "#333" }}>Loan Statuses</h3>
          <p>Approved: {data.loanStatuses.approved}</p>
          <p>Pending: {data.loanStatuses.pending}</p>
          <p>Rejected: {data.loanStatuses.rejected}</p>
        </div>

        {/* Overdue Loans */}
        <div
          style={{
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ color: "#c0392b" }}>Overdue Loans</h3>
          <p>Total Overdue: {data.overdueLoans}</p>
        </div>

        {/* Revenue Tracking */}
        <div
          style={{
            padding: "15px",
            background: "#f8f9fa",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ color: "#27ae60" }}>Revenue Tracking</h3>
          <p>Total Revenue: {data.revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
