// components/AddContact.jsx
import React, { useState } from 'react';
import './AddContact.css'; // Asegúrate de crear este archivo CSS

const AddContact = ({ connection, onAddContact }) => {
  const [contactJID, setContactJID] = useState('');
  const [message, setMessage] = useState('');

  const handleAddContact = () => {
    if (contactJID.trim()) {
      // Crear y enviar una solicitud de suscripción
      const presence = $pres({ to: contactJID, type: 'subscribe' });
      connection.send(presence);

      onAddContact(contactJID); // Notificar al componente Home

      setMessage('Subscription request sent.');
      setContactJID('');
    } else {
      setMessage('Please enter a valid JID.');
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
