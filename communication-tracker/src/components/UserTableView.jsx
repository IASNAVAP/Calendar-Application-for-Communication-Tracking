import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDashboard.css";

const UserTableView = ({ userId }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/companies");
        const companiesData = response.data;

        const meetingPromises = companiesData.map(async (company) => {
          const meetingResponse = await axios.get(
            `http://localhost:5000/api/communications/${company._id}/meetings`
          );
          return { [company._id]: meetingResponse.data };
        });

        const meetingsData = await Promise.all(meetingPromises);
        const meetingsMap = Object.assign({}, ...meetingsData);

        setCompanies(companiesData);
        setMeetings(meetingsMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching companies and meetings:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Company Communication Dashboard</h1>
      {loading ? (
        <p>Loading companies...</p>
      ) : (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Last 5 Communications</th>
              <th>Scheduled Meetings</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => {
              const companyMeetings = meetings[company._id] || [];

              return (
                <tr key={company._id}>
                  <td>{company.name}</td>
                  <td>
                    {company.lastCommunications.slice(0, 5).map((comm, index) => (
                      <div key={index}>
                        {comm.type} ({new Date(comm.date).toLocaleDateString()})
                      </div>
                    ))}
                  </td>
                  <td>
                    {companyMeetings.map((meeting, index) => (
                      <div key={index}>
                        {meeting.type} ({new Date(meeting.date).toLocaleDateString()}){" "}
                        {meeting.notes && `- ${meeting.notes}`}
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTableView;
