import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css"; // Add relevant styles here

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Notifications = ({ calendarData }) => {
  const [overdueCommunications, setOverdueCommunications] = useState([]);
  const [todaysCommunications, setTodaysCommunications] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Add state for toggling window visibility

  // Function to toggle the notification window
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const now = new Date();
    const today = formatDate(now);

    // Overdue: Scheduled before today and still marked as scheduled
    const overdue = calendarData.filter(
      (comm) => formatDate(comm.date) < today && comm.status === "Scheduled"
    );

    // Today's: Scheduled for today
    const dueToday = calendarData.filter(
      (comm) => formatDate(comm.date) === today && comm.status === "Scheduled"
    );

    setOverdueCommunications(overdue);
    setTodaysCommunications(dueToday);
  }, [calendarData]);

  return (
    <div className="notifications">
      <header className="notifications-header">
        <span className="notification-icon" onClick={toggleNotifications}>
          🔔
          <span className="badge">
            {overdueCommunications.length + todaysCommunications.length}
          </span>
        </span>
      </header>

      {/* Floating Notification Window */}
      {isOpen && (
        <div className="notification-window">
          {/* Overdue Communications */}
          <div className="notification-section overdue">
            <h2>Overdue Communications</h2>
            {overdueCommunications.length === 0 ? (
              <p>No overdue communications.</p>
            ) : (
              <ul>
                {overdueCommunications.map((comm, index) => (
                  <li key={index}>
                    <strong>{comm.companyName}</strong> - {comm.type} ({formatDate(comm.date)})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Partition Line */}
          <hr className="notification-divider" />

          {/* Today's Communications */}
          <div className="notification-section todays">
            <h2>Today's Communications</h2>
            {todaysCommunications.length === 0 ? (
              <p>No communications due today.</p>
            ) : (
              <ul>
                {todaysCommunications.map((comm, index) => (
                  <li key={index}>
                    <strong>{comm.companyName}</strong> - {comm.type} ({formatDate(comm.date)})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
