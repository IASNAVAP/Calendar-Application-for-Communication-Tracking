import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTableView from "./UserTableView";
import Notifications from "./Notifications"; 
import SimpleCalendar from "./SimpleCalendar";

const UserDashboard = () => {
  const [calendarData, setCalendarData] = useState([]);

  // Fetch combined calendar data
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/calendar");
        setCalendarData(response.data);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };
    fetchCalendarData();
  }, []);

  return (
    <div className="user-dashboard">
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <h1 style={{ marginLeft: "600px" }}>User Dashboard</h1>
        <Notifications calendarData={calendarData} />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <SimpleCalendar />
        <UserTableView userId={1} />
      </div>
        
    </div>
  );
};

export default UserDashboard;
