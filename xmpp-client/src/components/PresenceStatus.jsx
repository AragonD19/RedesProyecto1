import React, { useState, useEffect } from 'react';
import { Strophe } from 'strophe.js';
import './PresenceStatus.css';

const PresenceStatus = ({ connection }) => {
  const [status, setStatus] = useState('available');
  const [statusOptions] = useState([
    { value: 'available', label: 'Available' },
    { value: 'away', label: 'Away' },
    { value: 'dnd', label: 'Do Not Disturb' },
    { value: 'xa', label: 'Extended Away' },
  ]);

  useEffect(() => {
    if (connection) {
      updatePresence(status);
    }
  }, [connection, status]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    updatePresence(newStatus);
  };

  const updatePresence = (newStatus) => {
    if (connection) {
      const presence = $pres().c('status').t(newStatus);
      connection.send(presence);
    }
  };

  return (
    <div className="presence-status-container">
      <h2>Set Your Presence Status</h2>
      <select value={status} onChange={handleStatusChange} className="status-select">
        {statusOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PresenceStatus;
