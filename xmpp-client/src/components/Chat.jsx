// components/Chat.jsx
import React, { useState } from 'react';

const Chat = ({ contact, connection }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const messageElement = $msg({
      to: contact.jid,
      type: 'chat'
    }).c('body').t(message);

    connection.send(messageElement);
    setMessages([...messages, { from: 'me', text: message }]);
    setMessage('');
  };

  connection.addHandler((message) => {
    const from = Strophe.getBareJidFromJid(message.getAttribute('from'));
    const body = message.getElementsByTagName('body')[0];
    if (body) {
      setMessages([...messages, { from, text: body.textContent }]);
    }
    return true;
  }, null, 'message', 'chat');

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
