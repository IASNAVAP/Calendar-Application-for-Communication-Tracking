import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import UserTableView from "./UserTableView"; // Import the new UserTableView component
import "./UserDashboard.css";

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero for single digit months
  const day = String(d.getDate()).padStart(2, '0'); // Add leading zero for single digit days

  return `${year}-${month}-${day}`;
};

const UserDashboard = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetingData, setMeetingData] = useState([]);

  // Fetch combined calendar data (both past and scheduled communications) from the backend
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

  // Get the communications (meetings) for the selected date
  const getCommunicationsForDate = (date) => {
    const formattedDate = formatDate(date); // Format date as YYYY-MM-DD
    return calendarData.filter((comm) => {
      const meetingDate = formatDate(comm.date); // Format communication date
      return meetingDate === formattedDate;
    }).map((comm) => ({
      companyName: comm.companyName,
      type: comm.type,
      notes: comm.notes,
      date: comm.date,
      status: new Date(comm.date) < new Date() ? "Completed" : "Scheduled"
    }));
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Get the meetings data for the selected date
  useEffect(() => {
    setMeetingData(getCommunicationsForDate(selectedDate));
  }, [selectedDate, calendarData]);

  // Custom tile content to display meetings on each date block
  const tileContent = ({ date, view }) => {
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
      <h1>User Dashboard</h1>
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

      {/* User Table View (without Edit/Add functionality) */}
      <UserTableView userId={1} /> {/* Assuming userId or any other needed prop */}
    </div>
  );
};

export default UserDashboard;
