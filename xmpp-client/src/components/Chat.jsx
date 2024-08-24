// components/Chat.jsx
import React, { useEffect } from 'react';
import {Strophe} from 'strophe.js';

const Chat = ({ connection, onLogout }) => {
  useEffect(() => {
    if (!connection) return;

    // Puedes añadir más lógica para manejar la conexión, escuchar mensajes, etc.

    return () => {
      connection.disconnect();
      onLogout();
    };
  }, [connection, onLogout]);

  return (
    <div>
      <h2>Chat</h2>
      <button onClick={onLogout}>Logout</button>
      {/* Aquí puedes añadir más componentes y lógica para el chat */}
    </div>
  );
};

export default Chat;
