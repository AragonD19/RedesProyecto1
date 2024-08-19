// src/components/Logout.jsx
import React from 'react';

const LogoutComponent = () => {
  const handleLogout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
    });
    if (response.ok) {
      alert('Logged out successfully');
    } else {
      alert('Failed to log out');
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutComponent;
