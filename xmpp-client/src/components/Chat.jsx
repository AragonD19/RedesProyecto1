// components/Chat.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Chat.css'; // Importar el archivo CSS para el estilo

const Chat = ({ connection, onLogout }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (!connection) return;

    // Obtener el destinatario desde los parámetros de la URL
    const queryParams = new URLSearchParams(location.search);
    const to = queryParams.get('to');
    setRecipient(to || '');

    // Handler para recibir mensajes
    const onMessage = (msg) => {
      const from = msg.getAttribute('from');
      const body = msg.getElementsByTagName('body')[0].textContent;
      setMessages((prevMessages) => [...prevMessages, { from, body }]);
      return true;
    };

    connection.addHandler(onMessage, null, 'message', null, null, null);

    return () => {
      // No hacer nada aquí
    };
  }, [connection, location.search]);

  const handleSendMessage = () => {
    if (message.trim()) {
      if (recipient) {
        const msg = $msg({ to: recipient, type: 'chat' }).c('body').t(message);
        connection.send(msg);
        setMessages((prevMessages) => [...prevMessages, { from: 'You', body: message }]);
        setMessage('');
      } else {
        setError('Recipient not specified.');
      }
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Chat with {recipient || 'Unknown'}</h2>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.from === 'You' ? 'sent' : 'received'}`}>
            <strong>{msg.from}:</strong> {msg.body}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Chat;
