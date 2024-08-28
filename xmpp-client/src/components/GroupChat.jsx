// components/GroupChat.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GroupChat = ({ connection }) => {
  const { jid } = useParams(); // Obtener el JID del grupo de los parámetros de la ruta
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (connection && jid) {
      // Intenta unirte al grupo
      try {
        connection.send(
          $pres({ to: jid, type: 'subscribe' }).c('x', { xmlns: 'http://jabber.org/protocol/muc' }) // Se une al grupo
        );

        // Manejar mensajes del grupo
        const messageHandler = (message) => {
          const from = Strophe.getBareJidFromJid(message.getAttribute('from'));
          const body = message.getElementsByTagName('body')[0];
          if (body) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { from, text: body.textContent }
            ]);
          }
          return true;
        };

        connection.addHandler(messageHandler, null, 'message', 'groupchat');

        return () => {
          // Cleanup: remove the handler when the component unmounts
          connection.deleteHandler(messageHandler);
        };

      } catch (error) {
        console.error('Error joining the group chat:', error);
      }
    }
  }, [connection, jid]);

  return (
    <div className="group-chat">
      <h2>Group Chat: {jid}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.from}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/groups')}>Back to Groups</button>
      {/* Aquí podrías agregar un formulario para enviar mensajes al grupo */}
    </div>
  );
};

export default GroupChat;
