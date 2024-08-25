// components/AddContact.jsx
import React, { useState } from 'react';
import './AddContact.css'; // Asegúrate de crear este archivo CSS

const AddContact = ({ connection }) => {
  const [contactJID, setContactJID] = useState('');
  const [message, setMessage] = useState('');

  const handleAddContact = () => {
    if (contactJID.trim()) {
      const iq = $iq({ type: 'set', to: contactJID })
        .c('query', { xmlns: 'jabber:iq:roster' })
        .c('item', { jid: contactJID, subscription: 'both' });
      
      connection.sendIQ(iq, 
        (response) => {
          setMessage('Contact added successfully.');
          setContactJID('');
        }, 
        (error) => {
          setMessage('Error adding contact.');
        }
      );
    }
  };

  return (
    <div className="add-contact-container">
      <h2>Add Contact</h2>
      <input
        type="text"
        value={contactJID}
        onChange={(e) => setContactJID(e.target.value)}
        placeholder="Enter contact JID"
      />
      <button onClick={handleAddContact}>Add Contact</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddContact;
