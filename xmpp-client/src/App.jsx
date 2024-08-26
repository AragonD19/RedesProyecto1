// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import Home from './components/Home'; // Importar el nuevo componente Home
const App = () => {
  const [connection, setConnection] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (conn) => {
    console.log('handleLogin: conn ==>> ', conn);
    setConnection(conn);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (connection) {
      connection.disconnect(); // Desconectar la conexión XMPP
    }
    setConnection(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ?
            <Navigate to="/home" /> :
            <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ?
            <Home connection={connection} onLogout={handleLogout}/> :
            <Navigate to="/login" />
          }
        />
        <Route
          path="/chat"
          element={
            isAuthenticated ?
            <Chat connection={connection} onLogout={handleLogout} /> :
            <Navigate to="/login" />
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;