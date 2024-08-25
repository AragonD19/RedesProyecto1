// components/MessageInput.jsx
import React from 'react';
import './MessageInput.css'; // Asegúrate de tener este archivo CSS

const MessageInput = ({ message, onMessageChange, onSendMessage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage();
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Type a message..."
        className="message-input"
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default MessageInput;
