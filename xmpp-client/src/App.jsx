// App.jsx
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
  const [notifications, setNotifications] = useState([]); // Estado para manejar notificaciones

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
        const from = Strophe.getBareJidFromJid(msg.getAttribute('from'));
        const body = msg.getElementsByTagName('body')[0];

        if (body && !contacts.some(contact => contact.jid === from)) {
          // Si el remitente no está en la lista de contactos, muestra una notificación
          setNotifications(prev => [...prev, { from, text: body.textContent }]);
        }
        return true;
      }
    }
  }, [connection, contacts]);

  const handleLogin = (conn) => {
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
      }, (error) => {
        console.error('Registration failed:', error);
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

  const openChatWithUnknown = (jid) => {
    // Navegar al chat con el JID del remitente desconocido
    setNavigateTo(`/chat/${jid}`);
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
              {/* Mostrar notificaciones */}
              <div className="notifications">
                {notifications.map((notification, index) => (
                  <div key={index} className="notification">
                    <p>New message from {notification.from}: {notification.text}</p>
                    <button onClick={() => openChatWithUnknown(notification.from)}>Chat</button>
                  </div>
                ))}
              </div>
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
