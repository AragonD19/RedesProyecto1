// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';

const App = () => {
  const [connection, setConnection] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (conn) => {
    console.log('handleLogin: conn ==>> ', conn);
    setConnection(conn);
    setIsAuthenticated(true);
  };

  const handleRegister = (conn, username, password) => {
    conn.send(
      $iq({ type: 'set', id: 'register' })
        .c('query', { xmlns: 'jabber:iq:register' })
        .c('username').t(username).up()
        .c('password').t(password)
    );
  };


  const handleDeleteAccount = () => {
    if (connection) {
      connection.disconnect();
    }
    setConnection(null);
    setIsAuthenticated(false);
  };

  const handleLogout = () => {
    if (connection) {
      connection.disconnect();
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
            <Navigate to="/" /> :
            <Login 
              onLogin={handleLogin} 
              onRegister={handleRegister}
              onDeleteAccount={handleDeleteAccount} 
            />
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
