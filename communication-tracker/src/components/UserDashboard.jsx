import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import UserTableView from "./UserTableView";
import Notifications from "./Notifications"; // Import the new Notifications component
import "./UserDashboard.css";
import { Link } from 'react-router-dom';

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const UserDashboard = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetingData, setMeetingData] = useState([]);

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

  const getCommunicationsForDate = (date) => {
    const formattedDate = formatDate(date);
    return calendarData
      .filter((comm) => formatDate(comm.date) === formattedDate)
      .map((comm) => ({
        companyName: comm.companyName,
        type: comm.type,
        notes: comm.notes,
        date: comm.date,
        status:comm.status,
      }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setMeetingData(getCommunicationsForDate(selectedDate));
  }, [selectedDate, calendarData]);

  const tileContent = ({ date }) => {
    const meetingsForDay = getCommunicationsForDate(date);
    if (meetingsForDay.length > 0) {
      return (
        <div className="meeting-summary">
          {meetingsForDay.map((meeting, index) => (
            <div key={index} className="meeting-item">
              <span>{meeting.type} - {meeting.status}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="user-dashboard">
      <div style={{display:'flex', justifyContent:'space-between', width: '100%'}}>
      <h1 style={{marginLeft:'600px'}}>User Dashboard</h1>
      <Notifications calendarData={calendarData} />
      </div>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
        />
        <div className="meeting-details">
          <h2>Meetings for {selectedDate.toDateString()}</h2>
          {meetingData.length === 0 ? (
            <p>No meetings scheduled for this date.</p>
          ) : (
            meetingData.map((meeting, index) => (
              <div key={index} className="meeting-item">
                <p><strong>Company:</strong> {meeting.companyName}</p>
                <p><strong>Type:</strong> {meeting.type}</p>
                <p><strong>Notes:</strong> {meeting.notes}</p>
                <p><strong>Status:</strong> {meeting.status}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <UserTableView userId={1} />
      <Link to="/report">
        <button>View Communication Frequency Report</button>
      </Link>

    </div>
  );
};

export default UserDashboard;
