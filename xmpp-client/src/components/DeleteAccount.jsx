// src/components/DeleteAccount.jsx
import React, { useState } from 'react';
import PageContainer from './PageContainer';

const DeleteAccountComponent = () => {
  const [username, setUsername] = useState('');

  const handleDeleteAccount = async () => {
    const response = await fetch('/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    if (response.ok) {
      alert('Account deleted successfully');
    } else {
      alert('Failed to delete account');
    }
  };

  return (
    <PageContainer>
      <h2 style={{ color: "#388e3c" }}>Delete Account</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={{
          margin: "10px 0",
          padding: "10px",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "1px solid #b2dfdb",
          width: "100%",
          maxWidth: "400px"
        }}
      />
      <button
        onClick={handleDeleteAccount}
        style={{
          margin: "20px 0",
          padding: "10px 20px",
          fontSize: "1.2rem",
          backgroundColor: "#e53935", // Rojo para la acción de eliminar
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        Delete Account
      </button>
    </PageContainer>
  );
};

export default DeleteAccountComponent;
