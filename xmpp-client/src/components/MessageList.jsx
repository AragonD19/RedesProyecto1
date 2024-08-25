// components/MessageList.jsx
import React from 'react';
import './MessageList.css'; // Asegúrate de tener este archivo CSS

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.from === 'You' ? 'sent' : 'received'}`}>
          <p>{msg.body}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
