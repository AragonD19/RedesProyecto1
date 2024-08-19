// src/components/Register.jsx
import React, { useState } from 'react';
import PageContainer from './PageContainer';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      alert('Account registered successfully');
    } else {
      alert('Failed to register account');
    }
  };

  return (
    <PageContainer>
      <h2 style={{ color: "#388e3c" }}>Register</h2>
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
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
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
        onClick={handleRegister}
        style={{
          margin: "20px 0",
          padding: "10px 20px",
          fontSize: "1.2rem",
          backgroundColor: "#66bb6a",
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        Register
      </button>
    </PageContainer>
  );
};

export default RegisterComponent;
