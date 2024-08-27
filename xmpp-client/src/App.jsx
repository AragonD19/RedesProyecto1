import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ContactList from './components/ContactList';
import PresenceStatus from './components/PresenceStatus'; // Importa el componente PresenceStatus
import ChatPage from './components/ChatPage';

const App = () => {
  const [connection, setConnection] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [navigateTo, setNavigateTo] = useState(null); // Estado para la navegación

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

  const handleRegister = (username, password) => {
    if (connection) {
      const registerIQ = $iq({ type: 'set', to: 'alumchat.lol' })
        .c('query', { xmlns: 'jabber:iq:register' })
        .c('username').t(username).up()
        .c('password').t(password);
      
      connection.sendIQ(registerIQ, (result) => {
        console.log('Registration successful:', result);
        // Redirect to login or handle successful registration
      }, (error) => {
        console.error('Registration failed:', error);
        // Handle registration error
      });
    }
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
              <button onClick={handleLogout}>Logout</button>
              <ContactList connection={connection} setContacts={setContacts} />
              <PresenceStatus connection={connection} />
            </> :
            <Navigate to="/login" />
          }
        />
        <Route
          path="/chat/:jid"
          element={
            isAuthenticated ?
            <ChatPage connection={connection} setContacts={setContacts} /> :
            <Navigate to="/login" />
          }
        />
      </Routes>
      {/* Redirección condicional basada en el estado de navegación */}
      {navigateTo && <Navigate to={navigateTo} />}
    </Router>
  );
};

export default App;
