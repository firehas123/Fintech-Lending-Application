import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const ApplyLoan = () => {
  const [view, setView] = useState("options");
  const [loanType, setLoanType] = useState("");
  const [borrowerIncome, setBorrowerIncome] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [penalty, setPenalty] = useState("");
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  const [documents, setDocuments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [riskLevel, setRiskLevel] = useState(""); // New state for risk level
  const canvasRef = useRef(null);
  const [signature, setSignature] = useState(null);
  let isDrawing = false;

  //this part is linked to backend
  const [loanOffers, setLoanOffers] = useState([]); // State to store loan offers
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling
  useEffect(() => {
    // API call to fetch loan offers
    axios
      .get("http://localhost:8000/user-pannel/apply-loan")
      .then((response) => {
        setLoanOffers(response.data); // Store data in state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
        setError("Failed to load loan offers");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, loanTerm, interestRate]);
  useEffect(() => {
    calculateRiskLevel();
  }, [borrowerIncome, loanAmount]); // Recalculate risk level when income or loan amount changes
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [submitted]);

  const startDrawing = (e) => {
    isDrawing = true;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing = false;
    const canvas = canvasRef.current;
    setSignature(canvas.toDataURL());
  };

  const clearSignature = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setSignature(null);
  };
  const handleSignatureSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const signatureData = canvas.toDataURL("image/png"); // Convert to Base64
      setSignature(signatureData);
    }
  };
  const calculateRiskLevel = () => {
    if (!borrowerIncome || !loanAmount) {
      setRiskLevel("identifying..."); // Reset risk level if values are empty
      return;
    }

    const income = parseFloat(borrowerIncome);
    const loan = parseFloat(loanAmount);

    if (income > 5 * loan) {
      setRiskLevel("Low Risk 🟢");
    } else if (income >= 2 * loan) {
      setRiskLevel("Medium Risk 🟠");
    } else {
      setRiskLevel("High Risk 🔴");
    }
  };
  const styles = {
    container: {
      maxWidth: "700px",
      margin: "auto",
      padding: "25px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    button: {
      width: "100%",
      padding: "14px",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      margin: "10px 0",
      transition: "background 0.3s ease",
    },
    buttonPrimary: {
      width: "100%",
      padding: "14px",
      borderRadius: "6px",
      fontSize: "16px",
      background: "#007bff",
      transition: "background 0.3s ease",
      color: "#fff",
      border: "none",
    },
    clearButton: {
      padding: "8px 12px",
      borderRadius: "50px",
      fontSize: "14px",
      background: "#f44336",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "background 0.3s ease",
      position: "absolute",
      top: "160px",
      right: "10px",
    },
    buttonSecondary: { background: "#28a745", color: "#fff", border: "none" },
    input: {
      width: "87%",
      padding: "12px",
      margin: "8px 0",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    card: {
      padding: "15px",
      background: "#f9f9f9",
      borderRadius: "8px",
      marginBottom: "10px",
      textAlign: "left",
    },
  };

  const handleLoanSelect = (loan) => {
    setLoanType(loan.type);
    setLoanAmount(loan.amount);
    setLoanTerm(loan.duration);
    setInterestRate(loan.interest);
    setPenalty(loan.penalty);
    setMonthlyInstallment(loan.monthlyInstallment);
    setView("applyLoan");
  };

  const calculateEMI = () => {
    if (!loanAmount || !loanTerm || !interestRate) return;
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseInt(loanTerm);

    if (r === 0) {
      setMonthlyInstallment((P / n).toFixed(2));
    } else {
      const EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyInstallment(EMI.toFixed(2));
    }
  };

  useEffect(() => {
    if (loanAmount && borrowerIncome) {
      calculateRiskLevel();
      setInterestRate(8);
    }
    // Calculate EMI when loanAmount, loanTerm, or interestRate changes
    if (loanAmount && loanTerm && interestRate) {
      calculateEMI();
    }
  }, [loanAmount, loanTerm, interestRate, borrowerIncome]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !loanType ||
      !borrowerIncome ||
      !loanAmount ||
      !loanTerm ||
      documents.length === 0 ||
      !signature
    ) {
      alert(
        "All fields are required, including document upload and signature."
      );
      return;
    }

    // Convert files into Base64
    const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
    //conversion of the signature
    const signatureData = handleSignatureSave(); // Get Base64 signature
    if (!signatureData) {
      alert("Signature is required!");
      return;
    }

    const documentBase64Array = await Promise.all(
      documents.map((file) => convertFileToBase64(file))
    );

    // Prepare Form Data
    const formData = {
      loanType,
      borrowerIncome,
      loanAmount,
      loanTerm,
      interestRate,
      penalty,
      monthlyInstallment,
      riskLevel,
      documents: documentBase64Array, // Now sending files as Base64
      signature: signatureData, // Base64 string of signature
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/user-pannel/apply-loan",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("✅ Loan Application Submitted Successfully!");
      setView("options");
      setLoanType("");
      setBorrowerIncome("");
      setLoanAmount("");
      setLoanTerm("");
      setInterestRate("");
      setPenalty("");
      setMonthlyInstallment("");
      setDocuments([]);
      setSignature("");
      setSubmitted(false);
    } catch (error) {
      console.error("❌ Error submitting application:", error);
      alert("❌ Failed to submit loan application.");
    }
  };

  return (
    <div style={styles.container}>
      {view === "options" ? (
        <>
          <h2>🏦 Choose Loan Type</h2>
          <button
            style={{ ...styles.button, ...styles.buttonPrimary }}
            onClick={() => setView("applyLoan")}
          >
            Apply Custom Loan
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonSecondary }}
            onClick={() => setView("offers")}
          >
            Select from Offers
          </button>
        </>
      ) : view === "offers" ? (
        <>
          <h2>💰 Loan Offers</h2>

          {loanOffers.map((loan, index) => (
            <div key={index} style={styles.card}>
              <h3>{loan.type}</h3>
              <p>
                <strong>Amount:</strong> ${loan.amount}
              </p>
              <p>
                <strong>Duration:</strong> {loan.duration} months
              </p>
              <p>
                <strong>Interest Rate:</strong> {loan.interest}%
              </p>
              <p>
                <strong>Penalty:</strong> {loan.penalty}
              </p>
              <p>
                <strong>Monthly Installment:</strong> ${loan.monthlyInstallment}
              </p>

              <button
                style={{ ...styles.button, ...styles.buttonPrimary }}
                onClick={() => handleLoanSelect(loan)}
              >
                Apply for This Loan
              </button>
            </div>
          ))}
          <button
            style={{ ...styles.button, background: "#6c757d", color: "#fff" }}
            onClick={() => setView("options")}
          >
            Go Back
          </button>
        </>
      ) : (
        <>
          <h2>🏦 Apply for a Loan</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={loanType}
              placeholder="Loan Type"
              style={styles.input}
              onChange={(e) => setLoanType(e.target.value)}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Annual Income ($)"
              value={borrowerIncome}
              onChange={(e) => setBorrowerIncome(e.target.value)}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Loan Amount ($)"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Repayment Term (Months)"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
            />
            <p>
              <strong>Interest Rate:</strong> {interestRate}%
            </p>
            <p>
              <strong>Penalty:</strong> {penalty}
            </p>
            <p>
              <strong>Monthly Installment:</strong> ${monthlyInstallment}
            </p>
            <p>
              <strong>Risk Level:</strong> {riskLevel}
            </p>
            <input
              style={styles.input}
              type="file"
              multiple
              onChange={(e) => setDocuments(Array.from(e.target.files))}
            />

            <div>
              <p>
                <strong>Digital Signature:</strong>
              </p>
              <div
                style={{
                  position: "relative",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={200}
                  style={{ border: "1px solid black" }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                ></canvas>
                <button
                  type="button"
                  onClick={clearSignature}
                  style={styles.clearButton}
                >
                  Clear Signature
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitted}
              style={styles.buttonPrimary}
            >
              {submitted ? "✅ Submitted" : "Apply Now"}
            </button>
          </form>
          <button
            style={{ ...styles.button, background: "#6c757d", color: "#fff" }}
            onClick={() => setView("options")}
          >
            Go Back
          </button>
        </>
      )}
    </div>
  );
};

export default ApplyLoan;
