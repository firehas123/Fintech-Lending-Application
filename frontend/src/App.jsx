import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./Admin/SignupPage";
import Dashboard from "./Admin/Dashboard";
import UserPannel from "./Admin/UserPannel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/user-pannel/*" element={<UserPannel />} />
      </Routes>
    </Router>
  );
};

export default App;
