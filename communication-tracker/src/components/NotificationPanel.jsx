// import React, { useState, useEffect } from "react";
// import { getCompanies } from "../services/companyService";

// const NotificationPanel = () => {
//   const [overdueCommunications, setOverdueCommunications] = useState([]);
//   const [todaysCommunications, setTodaysCommunications] = useState([]);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const companies = await getCompanies();
//       const today = new Date().toISOString().split("T")[0];
  
//       const overdue = companies.filter(
//         (company) =>
//           company.nextCommunication &&
//           new Date(company.nextCommunication.date) < new Date(today)
//       );
  
//       const dueToday = companies.filter(
//         (company) =>
//           company.nextCommunication &&
//           new Date(company.nextCommunication.date).toISOString().split("T")[0] ===
//             today
//       );
  
//       setOverdueCommunications(overdue);
//       setTodaysCommunications(dueToday);
//     } catch (error) {
//       console.error("Failed to fetch notifications", error);
//     }
//   };
  

//   return (
//     <div>
//       <h2>Notifications</h2>
//       <div>
//         <h4>Overdue Communications</h4>
//         {overdueCommunications.length > 0 ? (
//           <ul>
//             {overdueCommunications.map((company) => (
//               <li key={company._id}>{company.name}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No overdue communications.</p>
//         )}
//       </div>
//       <div>
//         <h4>Today's Communications</h4>
//         {todaysCommunications.length > 0 ? (
//           <ul>
//             {todaysCommunications.map((company) => (
//               <li key={company._id}>{company.name}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No communications due today.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationPanel;
import React, { useState, useEffect } from "react";
import { getCompanies } from "../services/companyService";

const NotificationPanel = () => {
  const [overdueCommunications, setOverdueCommunications] = useState([]);
  const [todaysCommunications, setTodaysCommunications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const companies = await getCompanies();
      const today = new Date().toISOString().split("T")[0];

      const overdue = companies.filter(
        (company) =>
          company.nextCommunication &&
          new Date(company.nextCommunication.date) < new Date(today)
      );

      const dueToday = companies.filter(
        (company) =>
          company.nextCommunication &&
          new Date(company.nextCommunication.date).toISOString().split("T")[0] ===
            today
      );

      setOverdueCommunications(overdue);
      setTodaysCommunications(dueToday);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <div>
        <h4>Overdue Communications</h4>
        {overdueCommunications.length > 0 ? (
          <ul>
            {overdueCommunications.map((company) => (
              <li key={company._id}>{company.name}</li>
            ))}
          </ul>
        ) : (
          <p>No overdue communications.</p>
        )}
      </div>
      <div>
        <h4>Today's Communications</h4>
        {todaysCommunications.length > 0 ? (
          <ul>
            {todaysCommunications.map((company) => (
              <li key={company._id}>{company.name}</li>
            ))}
          </ul>
        ) : (
          <p>No communications due today.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
