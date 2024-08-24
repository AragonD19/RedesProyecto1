// components/Login.jsx
import React, { useState } from 'react';
import {Strophe} from 'strophe.js';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const connection = new Strophe.Connection('ws://alumchat.lol:7070/ws/');

    connection.connect(username + '@alumchat.lol', password, (status) => {
      if (status === Strophe.Status.CONNECTED) {
        console.log('Connected');
        onLogin(connection);
      } else if (status === Strophe.Status.AUTHFAIL) {
        setError('Authentication failed');
      } else if (status === Strophe.Status.ERROR) {
        setError('Connection error');
      }
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
