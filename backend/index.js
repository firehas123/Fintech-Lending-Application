const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
//my exports

const userRoutes = require("./controllers/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Simple Route
// app.get("/", (req, res) => {
//   res.send("Backend is running...");
// });
app.use("/user-pannel", userRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server Listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
