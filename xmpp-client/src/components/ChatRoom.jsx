import React, { useState, useEffect } from 'react';
import {Strophe} from 'strophe.js';

const ChatRoom = ({ connection }) => {
  const [roomName, setRoomName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const joinRoom = () => {
    if (connection && roomName) {
      const roomJid = `${roomName}@conference.alumchat.lol`; // Reemplaza con tu dominio de conferencia
      connection.send(
        $pres({ to: roomJid, type: 'subscribe' })
      );
    }
  };

  const sendMessageToRoom = () => {
    if (connection && roomName && message) {
      const roomJid = `${roomName}@conference.alumchat.lol`; // Reemplaza con tu dominio de conferencia
      connection.send(
        $msg({ to: roomJid, type: 'groupchat' }).c('body').t(message)
      );
      setMessage('');
    }
  };

  useEffect(() => {
    if (connection) {
      connection.addHandler((msg) => {
        if (msg.getAttribute('type') === 'groupchat') {
          const from = msg.getAttribute('from');
          const body = Strophe.getText(msg.getElementsByTagName('body')[0]);
          setMessages(messages => [...messages, { from, body }]);
        }
        return true;
      }, null, 'message');
    }
  }, [connection]);

  return (
    <div>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Room Name"
      />
      <button onClick={joinRoom}>Join Room</button>
      
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessageToRoom}>Send</button>
      </div>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.from}:</strong> {msg.body}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
