// components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AddContact from './AddContact';
import './Home.css'; // Asegúrate de tener un archivo CSS para Home

const Home = ({ connection }) => {
  return (
    <div className="home-container">
      <h1>Welcome to Chat App</h1>
      <div className="home-buttons">
        <Link to="/select-recipient" className="home-btn">Select Recipient</Link>
        <Link to="/chat" className="home-btn">Go to Chat</Link>
        <AddContact connection={connection} />
      </div>
    </div>
  );
};

export default Home;
