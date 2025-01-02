import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./SimpleCalendar.css"; // Import the custom CSS

const localizer = momentLocalizer(moment);

const SimpleCalendar = () => {
  const [events, setEvents] = useState([]); // State for events
  const [hoveredEvent, setHoveredEvent] = useState(null); // State to store the hovered event details
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 }); // Position for the popup

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/calendar");
        const fetchedEvents = await response.json();

        // Map events to the format required by react-big-calendar
        const events = fetchedEvents.map((event) => {
          return {
            title: `${event.companyName} - ${event.status}`,
            start: new Date(event.date),
            end: new Date(event.date),
            allDay: true,
            notes: event.notes,
            type: event.type,
            status: event.status,
            companyName: event.companyName, // Include company name
          };
        });

        setEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Function to handle mouse hover over events
  const handleEventHover = (event, e) => {
    const { clientX, clientY } = e;
    setPopupPosition({ top: clientY + 10, left: clientX + 10 });
    setHoveredEvent(event);
  };

  // Function to close popup when mouse leaves event
  const handleEventLeave = () => {
    setHoveredEvent(null);
  };
    // Filter events for today's date
    const today = moment().startOf("day");
    const todayEvents = events.filter((event) =>
      moment(event.start).isSame(today, "day")
    );

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month", "week", "day"]}
        onSelectEvent={(event) => setHoveredEvent(event)} // For selecting an event (optional)
        popup={false} // Disable the default popup behavior
        components={{
          event: ({ event }) => {
            const className = `rbc-events ${event.status.toLowerCase()}`;
            return (
              <div
                className={className}
                onMouseEnter={(e) => handleEventHover(event, e)}
                onMouseLeave={handleEventLeave} 
                style={{ cursor: "pointer" }} 
              >
                {event.title}
              </div>
            );
          },
        }}
      />

      {/* Today's events section */}
      <div className="today-events">
        <h3>Today's Events</h3>
        {todayEvents.length > 0 ? (
          <ul>
            {todayEvents.map((event, index) => (
              <li key={index}>
                <strong>{event.title}</strong> - {event.notes || "No notes"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events for today.</p>
        )}
      </div>

    

      {/* Display hovered event details in a popup */}
      {hoveredEvent && (
        <div
          className="custom-event-popup"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
        >
          <div className="custom-event-popup-content">
            <h3>Event Details</h3>
            <p>
              <strong>Company:</strong> {hoveredEvent.companyName}
            </p>
            <p>
              <strong>Type:</strong> {hoveredEvent.type}
            </p>
            <p>
              <strong>Status:</strong> {hoveredEvent.status}
            </p>
            <p>
              <strong>Notes:</strong>{" "}
              {hoveredEvent.notes || "No notes available."}
            </p>
          </div>
        </div>
      )}

      
    </div>

    
  );
};

export default SimpleCalendar;
