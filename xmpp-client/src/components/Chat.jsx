import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Strophe } from 'strophe.js';
import './Chat.css';

const Chat = ({ connection }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const onMessage = useCallback((msg) => {
    console.log('Received message:', msg);

    const from = msg.getAttribute('from');
    const type = msg.getAttribute('type');
    const body = msg.getElementsByTagName('body')[0];

    console.log('Message details:', { from, type, body });

    if (type === "chat" && body) {
      const messageText = body.textContent;
      const sender = Strophe.getBareJidFromJid(from);

      console.log('Parsed message:', { from: sender, body: messageText });

      setMessages(prev => {
        const isDuplicate = prev.some(m => 
          m.body === messageText && 
          m.from === sender
        );

        if (!isDuplicate) {
          console.log('Adding new message:', { from: sender, body: messageText });
          return [...prev, { from: sender, body: messageText, timestamp: Date.now() }];
        }
        return prev;
      });
    } else {
      console.log('Message ignored:', { type, body });
    }
    return true;
  }, []);

  useEffect(() => {
    if (!connection) return;

    const queryParams = new URLSearchParams(location.search);
    const to = queryParams.get('to');
    setRecipient(to || '');

    console.log('Setting up message handler...');
    connection.addHandler(onMessage, null, 'message', null, null, null);

    return () => {
      console.log('Cleaning up message handler...');
      connection.deleteHandler(onMessage);
    };
  }, [connection, location.search, onMessage]);

  const handleSendMessage = () => {
    if (message.trim() && recipient) {
      const msg = $msg({ to: recipient, type: 'chat' }).c('body').t(message);
      console.log('Sending message:', msg.toString());
      connection.send(msg);
      setMessages(prev => [...prev, { from: 'You', body: message, timestamp: Date.now() }]);
      setMessage('');
    } else if (!recipient) {
      setError('Recipient not specified.');
    }
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Chat with {recipient || 'Unknown'}</h2>
        <button className="home-btn" onClick={handleGoHome}>Home</button>
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
