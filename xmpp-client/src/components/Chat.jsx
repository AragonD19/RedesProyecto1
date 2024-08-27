// Chat.jsx
import React, { useState, useEffect } from 'react';
import { Strophe } from 'strophe.js';

const Chat = ({ contact, connection }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() === '') {
      return; // No enviar el mensaje si está vacío
    }

    const messageElement = $msg({
      to: contact.jid,
      type: 'chat'
    }).c('body').t(message);

    connection.send(messageElement);
    setMessages([...messages, { from: 'me', text: message }]);
    setMessage('');
  };

  useEffect(() => {
    const handleMessage = (msg) => {
      if (msg.getAttribute('type') === 'chat') {
        const from = Strophe.getBareJidFromJid(msg.getAttribute('from'));
        const body = msg.getElementsByTagName('body')[0];
        if (body) {
          setMessages(prevMessages => [...prevMessages, { from, text: body.textContent }]);
        }
      }
      return true;
    };

    const messageHandler = connection.addHandler(handleMessage, null, 'message', 'chat');

    return () => {
      connection.deleteHandler(messageHandler);
    };
  }, [connection]);

  return (
    <div className="chat">
      <h2>Chat with {contact.jid}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} className={msg.from === 'me' ? 'message-me' : 'message-them'}>
            {msg.from}: {msg.text}
          </p>
        ))}
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
