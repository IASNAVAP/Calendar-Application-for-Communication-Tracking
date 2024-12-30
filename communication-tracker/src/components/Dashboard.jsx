import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [meetingForm, setMeetingForm] = useState({
    date: "",
    type: "",
    notes: "",
  });
  const [newCompanyForm, setNewCompanyForm] = useState({
    name: "",
    location: "",
    linkedinProfile: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    communicationPeriodicity: "2 weeks",  // Default value
  });

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

  // Handle adding a new company
  const handleAddCompany = async () => {
    const { name, location, linkedinProfile, emails, phoneNumbers, comments, communicationPeriodicity } = newCompanyForm;

    const emailArray = emails.split(',').map((email) => email.trim());
    const phoneArray = phoneNumbers.split(',').map((phone) => phone.trim());

    const newCompany = {
      name,
      location,
      linkedinProfile,
      emails: emailArray,
      phoneNumbers: phoneArray,
      comments,
      communicationPeriodicity,
    };

    try {
      await axios.post("http://localhost:5000/api/companies/add", newCompany);
      alert("New company added successfully");
      window.location.reload(); // Refresh data after adding company
    } catch (error) {
      console.error("Error adding company:", error);
      alert("Failed to add the company.");
    }
  };

  // Handle adding a meeting
  const handleAddMeeting = (companyId) => {
    setSelectedCompany(companyId);
    setMeetingForm({ date: "", type: "", notes: "" });
  };

  // Handle editing an existing meeting
  const handleEditMeeting = (companyId, meeting) => {
    setSelectedCompany(companyId);
    setMeetingForm({ ...meeting });
  };

  // Handle saving a meeting (either adding or editing)
  const handleSaveMeeting = async () => {
    const { date, type, notes } = meetingForm;
    const companyId = selectedCompany;

    const meetingData = {
      date,
      type,
      notes,
    };

    try {
      if (meetingForm._id) {
        // If meetingForm has an _id, it's an edit action
        await axios.put(
          `http://localhost:5000/api/communications/${companyId}/meetings/${meetingForm._id}`,
          meetingData
        );
        alert("Meeting updated successfully");
      } else {
        // Otherwise, it's an add action
        await axios.post(
          `http://localhost:5000/api/communications/${companyId}/meetings`,
          meetingData
        );
        alert("Meeting added successfully");
      }
      setSelectedCompany(null);
      setMeetingForm({ date: "", type: "", notes: "" });
      window.location.reload(); // Refresh after saving the meeting
    } catch (error) {
      console.error("Error saving meeting:", error);
      alert("Failed to save the meeting.");
    }
  };

  // Handle deleting a company
  const handleDeleteCompany = async (companyId) => {
    try {
      await axios.delete(`http://localhost:5000/api/companies/delete/${companyId}`);
      alert("Company deleted successfully");
      window.location.reload(); // Refresh data after deleting company
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Failed to delete the company.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Company Communication Dashboard</h1>

      {/* Add New Company Form */}
      <div className="add-company-form">
        <h2>Add New Company</h2>
        <label>
          Name:
          <input
            type="text"
            value={newCompanyForm.name}
            onChange={(e) => setNewCompanyForm({ ...newCompanyForm, name: e.target.value })}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={newCompanyForm.location}
            onChange={(e) => setNewCompanyForm({ ...newCompanyForm, location: e.target.value })}
          />
        </label>
        <label>
          LinkedIn Profile:
          <input
            type="text"
            value={newCompanyForm.linkedinProfile}
            onChange={(e) => setNewCompanyForm({ ...newCompanyForm, linkedinProfile: e.target.value })}
          />
        </label>
        <label>
          Emails (comma separated):
          <input
            type="text"
            value={newCompanyForm.emails}
            onChange={(e) => setNewCompanyForm({ ...newCompanyForm, emails: e.target.value })}
          />
        </label>
        <label>
          Phone Numbers (comma separated):
          <input
            type="text"
            value={newCompanyForm.phoneNumbers}
            onChange={(e) => setNewCompanyForm({ ...newCompanyForm, phoneNumbers: e.target.value })}
          />
        </label>
        <label>
          Comments:
          <textarea
            value={newCompanyForm.comments}
            onChange={(e) => setNewCompanyForm({ ...newCompanyForm, comments: e.target.value })}
          />
        </label>
        <label>
          Communication Periodicity:
          <select
            value={newCompanyForm.communicationPeriodicity}
            onChange={(e) => setNewCompanyForm({ ...newCompanyForm, communicationPeriodicity: e.target.value })}
          >
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
            <option value="1 month">1 month</option>
          </select>
        </label>
        <button onClick={handleAddCompany}>Add Company</button>
      </div>

      {loading ? (
        <p>Loading companies...</p>
      ) : (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Last 5 Communications</th>
              <th>Scheduled Meetings</th>
              <th>Actions</th>
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
                  <td>
                    <button onClick={() => handleAddMeeting(company._id)}>Add</button>
                    {companyMeetings.map((meeting, index) => (
                      <button
                        key={index}
                        onClick={() => handleEditMeeting(company._id, meeting)}
                      >
                        Edit
                      </button>
                    ))}
                    <button onClick={() => handleDeleteCompany(company._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Add/Edit Meeting Form */}
      {selectedCompany && (
        <div className="meeting-form">
          <h2>{meetingForm._id ? "Edit Meeting" : "Add Meeting"}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveMeeting();
            }}
          >
            <label>
              Date:
              <input
                type="date"
                value={meetingForm.date}
                onChange={(e) =>
                  setMeetingForm({ ...meetingForm, date: e.target.value })
                }
                required
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                value={meetingForm.type}
                onChange={(e) =>
                  setMeetingForm({ ...meetingForm, type: e.target.value })
                }
                required
              />
            </label>
            <label>
              Notes:
              <textarea
                value={meetingForm.notes}
                onChange={(e) =>
                  setMeetingForm({ ...meetingForm, notes: e.target.value })
                }
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setSelectedCompany(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
