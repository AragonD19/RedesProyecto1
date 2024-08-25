// components/SelectRecipient.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectRecipient.css';

const SelectRecipient = ({ connection }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!connection) return;

    const fetchContacts = () => {
      const iq = $iq({ type: 'get', to: 'alumchat.lol' })
        .c('query', { xmlns: 'jabber:iq:roster' });
      
      connection.sendIQ(iq, (response) => {
        const items = response.getElementsByTagName('item');
        const contactList = Array.from(items).map(item => ({
          jid: item.getAttribute('jid'),
          name: item.getAttribute('name') || item.getAttribute('jid'),
          subscription: item.getAttribute('subscription'),
        }));
        setContacts(contactList);
      }, (error) => {
        console.error('Error fetching contacts:', error);
      });
    };
    
    
    fetchContacts();
  }, [connection]);

  const handleSelect = () => {
    if (selectedRecipient) {
      navigate(`/chat?recipient=${encodeURIComponent(selectedRecipient)}`);
    }
  };

  return (
    <div className="select-recipient-container">
      <h2>Select a Recipient</h2>
      {error && <p className="error">{error}</p>}
      <div className="recipient-list">
        <select
          value={selectedRecipient}
          onChange={(e) => setSelectedRecipient(e.target.value)}
        >
          <option value="">Select a recipient</option>
          {contacts.map((contact, index) => (
            <option key={index} value={contact.jid}>
              {contact.name} ({contact.subscription})
            </option>
          ))}
        </select>
        <button onClick={handleSelect} disabled={!selectedRecipient}>Start Chat</button>
      </div>
    </div>
  );
};

export default SelectRecipient;
