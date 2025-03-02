import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ActiveLoans from "./subPages/ActiveLoans";
import CompletedLoans from "./subPages/CompletedLoans";
import PendingLoans from "./subPages/PendingLoans";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LoanHistory = () => {
  const [activeTab, setActiveTab] = useState("completed");

  const completedLoans = [
    {
      id: 1,
      amount: 5000,
      interest: 5,
      issuanceDate: "2023-01-10",
      completionDate: "2023-12-10",
      penalties: 100,
      transactions: [
        { month: "Jan", paid: 500, status: "on-time" },
        { month: "Feb", paid: 500, status: "on-time" },
        { month: "Mar", paid: 400, status: "late" },
        { month: "Apr", paid: 600, status: "early" },
        { month: "May", paid: 500, status: "on-time" },
        { month: "Jun", paid: 500, status: "on-time" },
        { month: "Jul", paid: 500, status: "on-time" },
        { month: "Aug", paid: 500, status: "on-time" },
        { month: "Sep", paid: 500, status: "on-time" },
        { month: "Oct", paid: 500, status: "on-time" },
        { month: "Nov", paid: 250, status: "interest" },
        { month: "Dec", paid: 100, status: "penalty" },
      ],
    },
    {
      id: 2,
      amount: 10000,
      interest: 7,
      issuanceDate: "2023-01-10",
      completionDate: "2023-12-10",
      penalties: 400,
      transactions: [
        { month: "Jan", paid: 1000, status: "on-time" },
        { month: "Feb", paid: 1000, status: "on-time" },
        { month: "Mar", paid: 900, status: "late" },
        { month: "Apr", paid: 1100, status: "early" },
        { month: "May", paid: 1000, status: "on-time" },
        { month: "Jun", paid: 1000, status: "on-time" },
        { month: "Jul", paid: 1000, status: "on-time" },
        { month: "Aug", paid: 1000, status: "on-time" },
        { month: "Sep", paid: 1000, status: "on-time" },
        { month: "Oct", paid: 1000, status: "on-time" },
        { month: "Nov", paid: 700, status: "interest" },
        { month: "Dec", paid: 400, status: "penalty" },
      ],
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Loan History
      </h2>

      {/* Tab Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        {["completed", "active", "pending"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: activeTab === tab ? "#007BFF" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              transition: "0.3s",
              minWidth: "100px",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Loans
          </button>
        ))}
      </div>

      {/* Completed Loans Section */}
      {activeTab === "completed" && <CompletedLoans />}

      {/* Placeholder for other loan sections */}
      {activeTab === "active" && <ActiveLoans />}
      {activeTab === "pending" && <PendingLoans />}
    </div>
  );
};

export default LoanHistory;
