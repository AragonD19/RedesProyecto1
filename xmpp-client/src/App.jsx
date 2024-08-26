import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ContactList from './components/ContactList';
import ChatRoom from './components/ChatRoom'; // Importa el componente ChatRoom
import PresenceStatus from './components/PresenceStatus'; // Importa el componente PresenceStatus

const App = () => {
  const [connection, setConnection] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (connection) {
      connection.addHandler(handlePresence, null, 'presence');
      connection.addHandler(handleMessage, null, 'message');

      function handlePresence(presence) {
        const from = Strophe.getBareJidFromJid(presence.getAttribute('from'));
        const type = presence.getAttribute('type');

        if (type === 'subscribe') {
          // Manejar solicitudes de amistad
          console.log(`Friend request from ${from}`);
        } else if (type === 'unavailable') {
          // Manejar desconexiones
          setContacts(contacts => contacts.filter(contact => contact.jid !== from));
        } else {
          const status = presence.getElementsByTagName('status')[0];
          const contactStatus = status ? status.textContent : 'online';
          setContacts(contacts => {
            const updatedContacts = contacts.filter(contact => contact.jid !== from);
            updatedContacts.push({ jid: from, status: contactStatus });
            return updatedContacts;
          });
        }
        return true;
      }

      function handleMessage(msg) {
        if (msg.getAttribute('type') === 'groupchat') {
          // Manejar mensajes de grupo aquí si es necesario
        }
        return true;
      }
    }
  }, [connection]);

  const handleLogin = (conn) => {
    console.log('handleLogin: conn ==>> ', conn);
    setConnection(conn);
    setIsAuthenticated(true);
  };

  const handleRegister = (conn, username, password) => {
    // Manejo después de registrar la cuenta
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
        <Route
          path="/"
          element={
            isAuthenticated ?
            <>
              <button onClick={handleLogout}>Logout</button> {/* Botón de Logout */}
              <ContactList connection={connection} setContacts={setContacts} />
              <PresenceStatus connection={connection} />
              <ChatRoom connection={connection} /> {/* Añade el componente ChatRoom */}
            </> :
            <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
