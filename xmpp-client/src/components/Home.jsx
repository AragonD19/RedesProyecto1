// components/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ connection, onLogout }) => {
  const [recipient, setRecipient] = useState('');

  return (
    <div className="home-container">
      <h1>Welcome to Chat App</h1>
      <div className="home-buttons">
        <div className="chat-selection">
          <input
            type="text"
            placeholder="Enter username to chat with"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <Link
            to={`/chat?to=${recipient}`}
            className="home-btn"
            style={{ pointerEvents: recipient ? 'auto' : 'none', opacity: recipient ? 1 : 0.5 }}
          >
            Start Chat
          </Link>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
