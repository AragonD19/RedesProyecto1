// src/components/Presence.jsx
import React, { useState } from 'react';

const PresenceComponent = () => {
  const [status, setStatus] = useState('');

  const handleSetStatus = async () => {
    const response = await fetch('/set-presence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (response.ok) {
      alert('Status updated successfully');
    } else {
      alert('Failed to update status');
    }
  };

  return (
    <div>
      <h2>Set Presence</h2>
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Status message..."
      />
      <button onClick={handleSetStatus}>Set Status</button>
    </div>
  );
};

export default PresenceComponent;
