// components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Asegúrate de crear este archivo CSS

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the Home Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/chat">Go to Chat</Link>
          </li>
          {/* Agrega más enlaces a funcionalidades aquí */}
        </ul>
      </nav>
    </div>
  );
};

export default Home;
