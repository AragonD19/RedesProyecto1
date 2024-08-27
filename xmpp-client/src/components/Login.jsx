// components/Login.jsx
import React, { useState } from 'react';
import { Strophe } from 'strophe.js';
import './Login.css'; // Asegúrate de tener este archivo CSS

const Login = ({ onLogin, onRegister, onDeleteAccount }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const connection = new Strophe.Connection('ws://alumchat.lol:7070/ws/');

    if (isDeleting) {
      connection.connect(username + '@alumchat.lol', password, (status) => {
        if (status === Strophe.Status.CONNECTED) {
          connection.send(
            $iq({ type: 'set', id: 'delete' })
              .c('query', { xmlns: 'jabber:iq:register' })
              .c('remove')
          );
          console.log('Account deletion request sent');
          // Optionally redirect or notify user
        } else if (status === Strophe.Status.AUTHFAIL) {
          setError('Authentication failed');
        } else if (status === Strophe.Status.ERROR) {
          setError('Connection error');
        }
      });
    } else if (isRegistering) {
      connection.connect(username + '@alumchat.lol', password, (status) => {
        if (status === Strophe.Status.CONNECTED) {
          connection.send(
            $iq({ type: 'set', id: 'register' })
              .c('query', { xmlns: 'jabber:iq:register' })
              .c('username').t(username).up()
              .c('password').t(password)
          );
          console.log('Registration request sent');
          onRegister(connection, username, password);
          // Optionally redirect or notify user
        } else if (status === Strophe.Status.AUTHFAIL) {
          setError('Authentication failed');
        } else if (status === Strophe.Status.ERROR) {
          setError('Connection error');
        }
      });
    } else {
      connection.connect(username + '@alumchat.lol', password, (status) => {
        if (status === Strophe.Status.CONNECTED) {
          onLogin(connection);
        } else if (status === Strophe.Status.AUTHFAIL) {
          setError('Authentication failed');
        } else if (status === Strophe.Status.ERROR) {
          setError('Connection error');
        }
      });
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Register' : isDeleting ? 'Delete Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          {isRegistering ? 'Register' : isDeleting ? 'Delete Account' : 'Login'}
        </button>
        {error && <p className="error">{error}</p>}
        {!isDeleting && (
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="toggle-btn"
          >
            {isRegistering ? 'Already have an account?' : 'Need an account?'}
          </button>
        )}
        {!isRegistering && !isDeleting && (
          <button
            type="button"
            onClick={() => setIsDeleting(true)}
            className="delete-btn"
          >
            Delete Account
          </button>
        )}
        {isDeleting && (
          <button
            type="button"
            onClick={() => setIsDeleting(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
