import React from "react";

const CompanyDetails = ({ viewCompanyDetails, setViewCompanyDetails }) => {
  return (
    <div>
      <h2>{viewCompanyDetails.name}</h2>
      <p>Location: {viewCompanyDetails.location}</p>
      <p>LinkedIn: {viewCompanyDetails.linkedinProfile}</p>
      <button onClick={() => setViewCompanyDetails(null)}>Close</button>
    </div>
  );
};

export default CompanyDetails;
