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

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CompletedLoans = () => {
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
    <div>
      {completedLoans.length > 0 ? (
        completedLoans.map((loan) => {
          const totalAmount =
            loan.amount + (loan.amount * loan.interest) / 100 + loan.penalties;
          let cumulativePaid = 0;

          return (
            <div
              key={loan.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#f8f9fa",
              }}
            >
              <h4>Loan ID: {loan.id}</h4>
              <p>
                <strong>Loan Amount:</strong> ${loan.amount}
              </p>
              <p>
                <strong>Interest:</strong> {loan.interest}%
              </p>
              <p>
                <strong>Issued on:</strong> {loan.issuanceDate}
              </p>
              <p>
                <strong>Completed on:</strong> {loan.completionDate}
              </p>
              <p>
                <strong>Penalties:</strong> ${loan.penalties}
              </p>
              <p>
                <strong>Total Amount Paid:</strong> ${totalAmount.toFixed(2)}
              </p>

              <h5>Complete Payment Schedule</h5>
              <Line
                data={{
                  labels: loan.transactions.map((txn) => txn.month),
                  datasets: [
                    {
                      label: "Cumulative Amount Paid",
                      data: loan.transactions.map((txn) => {
                        cumulativePaid += txn.paid;
                        return cumulativePaid;
                      }),
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      borderColor: "rgba(75, 192, 192, 1)",
                      borderWidth: 2,
                      fill: true,
                    },
                    {
                      label: "Monthly Deposits",
                      data: loan.transactions.map((txn) => txn.paid),
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                      borderColor: "rgba(255, 99, 132, 1)",
                      borderWidth: 2,
                      fill: false,
                    },
                  ],
                }}
              />
            </div>
          );
        })
      ) : (
        <p>No completed loans found.</p>
      )}
    </div>
  );
};

export default CompletedLoans;
