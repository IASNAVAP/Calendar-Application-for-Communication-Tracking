// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import { getCompanies } from "../services/companyService";

// const Reports = () => {
//   const [communicationData, setCommunicationData] = useState({});

//   useEffect(() => {
//     fetchReportData();
//   }, []);

//   const fetchReportData = async () => {
//     try {
//       const companies = await getCompanies();

//       const methodCount = companies.reduce((acc, company) => {
//         company.communications.forEach((comm) => {
//           acc[comm.type] = (acc[comm.type] || 0) + 1;
//         });
//         return acc;
//       }, {});

//       setCommunicationData(methodCount);
//     } catch (error) {
//       console.error("Failed to fetch report data", error);
//     }
//   };

//   const chartData = {
//     labels: Object.keys(communicationData),
//     datasets: [
//       {
//         label: "Number of Communications",
//         data: Object.values(communicationData),
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Reports</h2>
//       <div style={{ width: "600px", margin: "0 auto" }}>
//         <Bar data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default Reports;
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getCompanies } from "../services/companyService";

const Reports = () => {
  const [communicationData, setCommunicationData] = useState({});

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const companies = await getCompanies();

      const methodCount = companies.reduce((acc, company) => {
        company.communications.forEach((comm) => {
          acc[comm.type] = (acc[comm.type] || 0) + 1;
        });
        return acc;
      }, {});

      setCommunicationData(methodCount);
    } catch (error) {
      console.error("Failed to fetch report data", error);
    }
  };

  const chartData = {
    labels: Object.keys(communicationData),
    datasets: [
      {
        label: "Number of Communications",
        data: Object.values(communicationData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div>
      <h2>Reports</h2>
      <div style={{ width: "600px", margin: "0 auto" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Reports;
