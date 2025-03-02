import React, { useState } from "react";

const PendingLoanPayments = () => {
  const [loans, setLoans] = useState([
    {
      id: 1,
      type: "Personal Loan",
      borrower: "John Doe",
      amount: 5000,
      term: 12,
      interestRate: 5,
      status: "Pending",
      paymentMethod: "",
      paid: false,
    },
    {
      id: 2,
      type: "Car Loan",
      borrower: "Alice Smith",
      amount: 15000,
      term: 24,
      interestRate: 7,
      status: "Pending",
      paymentMethod: "",
      paid: false,
    },
    {
      id: 3,
      type: "Home Loan",
      borrower: "Bob Johnson",
      amount: 50000,
      term: 36,
      interestRate: 4.5,
      status: "Pending",
      paymentMethod: "",
      paid: false,
    },
  ]);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [bankName, setBankName] = useState("");

  const handlePayNow = (loan) => {
    setSelectedLoan(loan);
  };

  const handlePayment = () => {
    if (!selectedLoan || !paymentMethod) return;

    setLoans(
      loans.map((loan) =>
        loan.id === selectedLoan.id
          ? {
              ...loan,
              status: "Paid",
              paymentMethod: paymentMethod,
              paid: true,
            }
          : loan
      )
    );
    setPaymentHistory([
      ...paymentHistory,
      {
        ...selectedLoan,
        method: paymentMethod,
        date: new Date().toLocaleString(),
      },
    ]);
    setSelectedLoan(null);
    setPaymentMethod("");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Pending Loan Payments</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "white" }}>
            <th>Type</th>
            <th>Borrower</th>
            <th>Amount</th>
            <th>Term</th>
            <th>Interest</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr
              key={loan.id}
              style={{ backgroundColor: loan.paid ? "#d4edda" : "#ffebcc" }}
            >
              <td>{loan.type}</td>
              <td>{loan.borrower}</td>
              <td>${loan.amount}</td>
              <td>{loan.term} months</td>
              <td>{loan.interestRate}%</td>
              <td>
                {loan.paid ? `Paid with ${loan.paymentMethod}` : "Pending"}
              </td>
              <td>
                {!loan.paid && (
                  <button
                    onClick={() => handlePayNow(loan)}
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      padding: "5px",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    Pay Now
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLoan && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3>Paying Loan for {selectedLoan.borrower}</h3>
          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
          >
            <option value="">Select Payment Method</option>
            <option value="Credit/Debit">Credit/Debit Card</option>
            <option value="ACH">ACH Bank Transfer</option>
            <option value="Wire Transfer">Wire Transfer</option>
          </select>
          {paymentMethod === "Credit/Debit" && (
            <div>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(e.target.value.replace(/[^0-9]/g, ""))
                }
                style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
              />
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
              />
            </div>
          )}

          {paymentMethod === "ACH" && (
            <div>
              <input
                type="text"
                placeholder="Bank Account Number"
                value={bankAccount}
                onChange={(e) =>
                  setBankAccount(e.target.value.replace(/[^0-9]/g, ""))
                }
                style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
              />
              <input
                type="text"
                placeholder="Routing Number"
                value={routingNumber}
                onChange={(e) =>
                  setRoutingNumber(e.target.value.replace(/[^0-9]/g, ""))
                }
                style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
              />
            </div>
          )}

          {paymentMethod === "Wire Transfer" && (
            <div>
              <input
                type="text"
                placeholder="SWIFT Code"
                value={swiftCode}
                onChange={(e) => setSwiftCode(e.target.value)}
                style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
              />
              <input
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
              />
            </div>
          )}
          <button
            onClick={handlePayment}
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              width: "100%",
            }}
          >
            Confirm Payment
          </button>
        </div>
      )}

      <h3>Payment History</h3>
      <ul>
        {paymentHistory.map((payment, index) => (
          <li
            key={index}
            style={{
              backgroundColor: "#e9ecef",
              padding: "10px",
              marginBottom: "5px",
            }}
          >
            {payment.borrower} paid ${payment.amount} via {payment.method} on{" "}
            {payment.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingLoanPayments;
