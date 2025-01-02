// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/UserDashboard";
import Report from "./components/Report";
import SimpleCalendar from "./components/SimpleCalendar";

import LandingPage from "./components/LandingPage";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} /> 
        <Route path="/report" element={<Report />} />
        <Route path="/simple" element={<SimpleCalendar />} />

      </Routes>
    </Router>
  );
};

export default App;
