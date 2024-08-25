// components/Chat.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './Chat.css'; // Asegúrate de tener este archivo CSS

const Chat = ({ connection }) => {
  const [conversations, setConversations] = useState({});
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    if (!connection) return;

    // Función para manejar los mensajes entrantes
    const handleMessage = (msg) => {
      const from = msg.getAttribute('from');
      const body = msg.getElementsByTagName('body')[0]?.textContent;

      setConversations(prevConversations => {
        const chatMessages = prevConversations[from] || [];
        return {
          ...prevConversations,
          [from]: [...chatMessages, { from, body }]
        };
      });

      return true; // Mantener el manejador activo
    };

    // Bind the handler
    const boundHandler = connection.addHandler(handleMessage, null, 'message', null, null, null);

    return () => {
      // Unbind the handler
      if (boundHandler) {
        connection.deleteHandler(boundHandler);
      }
    };
  }, [connection]);

  const handleSendMessage = (msg) => {
    if (currentChat) {
      connection.send($msg({
        to: currentChat,
        type: 'chat'
      }).c('body').t(msg));

      // Update conversation state
      setConversations(prevConversations => {
        const chatMessages = prevConversations[currentChat] || [];
        return {
          ...prevConversations,
          [currentChat]: [...chatMessages, { from: 'You', body: msg }]
        };
      });

      setMessage('');
    }
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  const handleSelectContact = (contactJID) => {
    setCurrentChat(contactJID);
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <button onClick={handleBackToHome} className="home-button">Back to Home</button>
        <div className="contacts-list">
          {/* Aquí deberías renderizar la lista de contactos y permitir seleccionar uno */}
          {/* Ejemplo de contacto: */}
          <button onClick={() => handleSelectContact('contact@example.com')}>Contact 1</button>
          <button onClick={() => handleSelectContact('contact2@example.com')}>Contact 2</button>
        </div>
      </div>
      <div className="chat-content">
        {currentChat ? (
          <>
            <MessageList messages={conversations[currentChat] || []} />
            <MessageInput
              message={message}
              onMessageChange={setMessage}
              onSendMessage={() => handleSendMessage(message)}
            />
          </>
        ) : (
          <p>Select a contact to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
