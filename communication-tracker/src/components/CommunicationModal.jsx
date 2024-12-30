// import React, { useState } from "react";
// import { addCommunication } from "../services/communicationService";

// const CommunicationModal = ({ company, onClose }) => {
//   const [type, setType] = useState("");
//   const [date, setDate] = useState("");
//   const [notes, setNotes] = useState("");

//   const handleSubmit = async () => {
//     try {
//       await addCommunication({
//         companyId: company._id,
//         type,
//         date,
//         notes,
//       });
//       alert("Communication added successfully!");
//       onClose();
//     } catch (error) {
//       console.error("Failed to add communication", error);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <h2>Add Communication</h2>
//         <form>
//           <div className="form-group">
//             <label>Type</label>
//             <select
//               className="form-control"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//             >
//               <option value="">Select Type</option>
//               <option value="LinkedIn Post">LinkedIn Post</option>
//               <option value="Email">Email</option>
//               <option value="Phone Call">Phone Call</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Date</label>
//             <input
//               type="date"
//               className="form-control"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label>Notes</label>
//             <textarea
//               className="form-control"
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//             />
//           </div>
//           <button type="button" className="btn btn-success" onClick={handleSubmit}>
//             Submit
//           </button>
//           <button type="button" className="btn btn-secondary" onClick={onClose}>
//             Close
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CommunicationModal;
import React, { useState } from "react";
import { addCommunication } from "../services/communicationService";

const CommunicationModal = ({ company, onClose }) => {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    try {
      await addCommunication({
        companyId: company._id,
        type,
        date,
        notes,
      });
      alert("Communication added successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to add communication", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Communication with {company.name}</h2>
        <form>
          <div className="form-group">
            <label>Type</label>
            <select
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="LinkedIn Post">LinkedIn Post</option>
              <option value="Email">Email</option>
              <option value="Phone Call">Phone Call</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              className="form-control"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-success" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunicationModal;
