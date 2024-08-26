// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ContactList from './components/ContactList'; // Nuevo componente para la lista de contactos
import {Strophe} from 'strophe.js';

const App = () => {
  const [connection, setConnection] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (connection) {
      connection.addHandler(handlePresence, null, 'presence');

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
    }
  }, [connection]);

  const handleLogin = (conn) => {
    setConnection(conn);
    setIsAuthenticated(true);
  };

  const handleRegister = (username, password) => {
    if (connection) {
      const iq = $iq({ type: 'set', id: 'register' })
        .c('query', { xmlns: 'jabber:iq:register' })
        .c('username').t(username).up()
        .c('password').t(password);

      connection.sendIQ(iq, () => {
        console.log('Registration successful');
        setIsAuthenticated(true);
      }, (error) => {
        console.error('Error registering account:', error);
      });
    }
  };

  const handleDeleteAccount = () => {
    if (connection) {
      const iq = $iq({ type: 'set', id: 'register' })
        .c('query', { xmlns: 'jabber:iq:register' })
        .c('username').t(connection.authcid).up()
        .c('password').t(connection.authpass);

      connection.sendIQ(iq, () => {
        console.log('Account deleted successfully');
        handleLogout();
      }, (error) => {
        console.error('Error deleting account:', error);
      });
    }
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
            <ContactList 
              connection={connection} 
              contacts={contacts} 
              setContacts={setContacts} 
            /> : 
            <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
