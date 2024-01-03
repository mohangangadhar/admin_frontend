import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../configure.js';


const emailnav = 'qSvgJ3eSM4RaaGIuhPT1RKmV2C63'; // Replace with your actual email UID

const Fetch1 = () => {
  const [selectedEmailUid, setSelectedEmailUid] = useState(emailnav);
  const [clientIdsList, setClientIdsList] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/getDataByEmailUid?email_uid=${selectedEmailUid}`);
        const data = await response.json();

        console.log('Data by email_uid:', data);

        // Extract client_ids from data
        const clientIds = data.map((item) => item.client_id);

        // Use Set to remove duplicate values
        const uniqueClientIds = Array.from(new Set(clientIds));

        setClientIdsList(uniqueClientIds);
      } catch (error) {
        console.error('Error fetching data by email_uid:', error);
      }
    };

    fetchData();
  }, [selectedEmailUid]);

  const handleClientIdChange = (event) => {
    setSelectedClientId(event.target.value);
  };

  return (
    <div className='fetch1'>
      <h2>Email UID to Client ID Mapping</h2>

      {/* Omitted the code for the label and dropdown related to email UID */}

      <label htmlFor="clientIdSelect">Select Client ID:</label>
      <select
        className="form-control"
        id="clientIdSelect"
        value={selectedClientId}
        onChange={handleClientIdChange}
      >
        <option key="" value="">Select a Client ID</option>
        {clientIdsList.map((clientId, index) => (
          <option key={index} value={clientId}>
            {clientId}
          </option>
        ))}
      </select>

    </div>
  );
};

export default Fetch1;
