// src/components/Chat.jsx
import React, { useState, useEffect } from 'react';
import PageContainer from './PageContainer';

const ChatComponent = ({ contactId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`/messages/${contactId}`);
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, [contactId]);

  const handleSendMessage = async () => {
    const response = await fetch('/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactId, message: newMessage }),
    });
    if (response.ok) {
      setNewMessage('');
      fetchMessages(); // refresh messages
    } else {
      alert('Failed to send message');
    }
  };

  return (
    <PageContainer>
      <h2 style={{ color: "#388e3c" }}>Chat</h2>
      <div className="messages" style={{
        border: "1px solid #b2dfdb",
        borderRadius: "5px",
        padding: "10px",
        height: "300px",
        overflowY: "scroll",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}>
        {messages.map((msg, idx) => (
          <p key={idx} style={{
            margin: "5px 0",
            padding: "5px",
            backgroundColor: "#e8f5e9",
            borderRadius: "5px",
          }}>
            {msg.sender}: {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        style={{
          margin: "10px 0",
          padding: "10px",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "1px solid #b2dfdb",
          width: "100%",
        }}
      />
      <button
        onClick={handleSendMessage}
        style={{
          padding: "10px 20px",
          fontSize: "1.2rem",
          backgroundColor: "#388e3c",
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Send
      </button>
    </PageContainer>
  );
};

export default ChatComponent;
