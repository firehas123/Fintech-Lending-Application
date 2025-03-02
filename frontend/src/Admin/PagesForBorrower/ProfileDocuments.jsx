import React, { useState, useRef } from "react";

const FileUploadEmail = () => {
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle File Upload
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  // Start Camera
  const startCamera = async () => {
    setCameraActive(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  // Capture Image
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      setFiles([
        ...files,
        new File([blob], "captured_image.png", { type: "image/png" }),
      ]);
    });
  };

  // Open Gmail with Attachments Info
  const sendEmail = () => {
    const fileDetails = files.map((file) => file.name).join("%0D%0A"); // Format for email body
    const bodyContent = `Files:
${fileDetails}

${message}`;
    const mailto = `mailto:${email}?subject=File Attachment&body=${encodeURIComponent(
      bodyContent
    )}`;
    window.location.href = mailto;
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h2>Upload & Send Files</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "block", margin: "10px auto" }}
      />
      <button
        onClick={startCamera}
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          margin: "10px",
        }}
      >
        Open Camera
      </button>
      {cameraActive && (
        <div>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", marginTop: "10px" }}
          ></video>
          <button
            onClick={captureImage}
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              cursor: "pointer",
              margin: "10px",
            }}
          >
            Capture Image
          </button>
          <canvas
            ref={canvasRef}
            style={{ display: "none" }}
            width="400"
            height="300"
          ></canvas>
        </div>
      )}
      <div>
        <h3>Selected Files:</h3>
        {files.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
      <input
        type="email"
        placeholder="Recipient Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "10px 0" }}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "10px 0" }}
      ></textarea>
      <button
        onClick={sendEmail}
        style={{
          padding: "10px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send Email
      </button>
    </div>
  );
};

export default FileUploadEmail;
