// components/Chat.jsx
import React, { useEffect, useState } from 'react';
import './Chat.css'; // Importar el archivo CSS para el estilo

const Chat = ({ connection, onLogout }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!connection) return;

    // Handler para recibir mensajes
    const onMessage = (msg) => {
      const from = msg.getAttribute('from');
      const body = msg.getElementsByTagName('body')[0].textContent;
      setMessages((prevMessages) => [...prevMessages, { from, body }]);
      return true;
    };

    connection.addHandler(onMessage, null, 'message', null, null, null);

    // No hacer nada en la desconexión aquí; se maneja en el componente padre
    return () => {
      // No hacer nada aquí
    };
  }, [connection]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const to = 'someuser@alumchat.lol'; // Cambia esto a la dirección del destinatario
      const msg = $msg({ to, type: 'chat' }).c('body').t(message);
      connection.send(msg);
      setMessages((prevMessages) => [...prevMessages, { from: 'You', body: message }]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Chat</h2>
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
    </div>
  );
};

export default Chat;
