// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NotificationPanel from "./components/NotificationPanel";
import UserDashboard from "./components/UserDashboard"; // Import CalendarView
import Reports from "./components/Reports";
import LandingPage from "./components/LandingPage";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />  {/* Route to CalendarView */}
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
};

export default App;
