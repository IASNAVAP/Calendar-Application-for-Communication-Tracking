import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Add styles if needed

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to the Application</h1>
      <div className="button-group">
        <button className="admin-btn" onClick={() => navigate("/admin-dashboard")}>
          Admin
        </button>
        <button className="user-btn" onClick={() => navigate("/user-dashboard")}>
          User
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
