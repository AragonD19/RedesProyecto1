// src/components/GroupChat.jsx
import React, { useState, useEffect } from 'react';

const GroupChatComponent = ({ groupId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchGroupMessages = async () => {
      const response = await fetch(`/group-messages/${groupId}`);
      const data = await response.json();
      setMessages(data);
    };

    fetchGroupMessages();
  }, [groupId]);

  const handleSendGroupMessage = async () => {
    const response = await fetch('/send-group-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ groupId, message: newMessage }),
    });
    if (response.ok) {
      setNewMessage('');
      fetchGroupMessages(); // refresh messages
    } else {
      alert('Failed to send message');
    }
  };

  return (
    <div>
      <h2>Group Chat</h2>
      <div className="messages">
        {messages.map((msg, idx) => (
          <p key={idx}>{msg.sender}: {msg.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendGroupMessage}>Send</button>
    </div>
  );
};

export default GroupChatComponent;
