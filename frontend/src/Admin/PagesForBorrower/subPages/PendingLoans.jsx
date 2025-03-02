import React, { useState } from "react";

const PendingLoans = () => {
  const [loans, setLoans] = useState([
    {
      type: "Home Loan",
      borrower: "John Doe",
      term: "30 years",
      interestRate: "3.5%",
      amount: "$250,000",
      governmentID: "123456789",
      digitalSignature: "Signed",
      status: "Pending",
      requestedDate: "2024-01-10",
    },
    {
      type: "Car Loan",
      borrower: "Jane Smith",
      term: "5 years",
      interestRate: "4.2%",
      amount: "$35,000",
      governmentID: "987654321",
      digitalSignature: "Signed",
      status: "Pending",
      requestedDate: "2024-01-12",
    },
    {
      type: "Education Loan",
      borrower: "Alice Johnson",
      term: "10 years",
      interestRate: "5.0%",
      amount: "$50,000",
      governmentID: "567890123",
      digitalSignature: "Signed",
      status: "Pending",
      requestedDate: "2024-01-15",
    },
  ]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        width: "100%",
        margin: "auto",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#007bff" }}>
        Pending Loan Requests
      </h2>
      <table
        style={{
          width: "90%",
          borderCollapse: "collapse",
          marginTop: "20px",

          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            {[
              "Type",
              "Borrower",
              "Term",
              "Interest Rate",
              "Amount",
              "Government ID",
              "Digital Signature",
              "Requested Date",
              "Status",
            ].map((field, index) => (
              <th
                key={index}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "12px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                }}
              >
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  loan.status === "Pending" ? "#ffebcc" : "#d4edda",
                transition: "background-color 0.3s ease",
              }}
            >
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {loan.type}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {loan.borrower}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {loan.term}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {loan.interestRate}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {loan.amount}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {loan.governmentID}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {loan.digitalSignature}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {loan.requestedDate}
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                  color: loan.status === "Pending" ? "#dc3545" : "#28a745",
                }}
              >
                {loan.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingLoans;
