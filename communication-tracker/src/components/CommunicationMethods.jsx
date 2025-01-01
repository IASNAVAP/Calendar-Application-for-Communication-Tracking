import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommunicationMethods.css';

const CommunicationMethods = () => {
  const [methods, setMethods] = useState([]); // Ensure initial state is an empty array
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      fetchCommunicationMethods();
    }
  }, [isVisible]);

  const fetchCommunicationMethods = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/communication-methods'); // Update with your API endpoint
      // Ensure the response is an array
      const data = Array.isArray(response.data) ? response.data : [];
      setMethods(data);
    } catch (err) {
      console.error('Error fetching communication methods:', err);
    }
  };

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide Communication Methods' : 'Show Communication Methods'}
      </button>

      {isVisible && (
        <div className="methods-container">
          <h2>Communication Methods</h2>
          {methods.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Sequence</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Mandatory</th>
                </tr>
              </thead>
              <tbody>
                {methods.map((method) => (
                  <tr key={method.sequence}>
                    <td>{method.sequence}</td>
                    <td>{method.name}</td>
                    <td>{method.description}</td>
                    <td>{method.mandatory ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No communication methods available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunicationMethods;
