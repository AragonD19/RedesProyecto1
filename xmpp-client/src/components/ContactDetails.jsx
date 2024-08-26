// components/ContactDetails.jsx
import React from 'react';

const ContactDetails = ({ contact }) => {
  return (
    <div className="contact-details">
      <h2>Contact Details</h2>
      <p>JID: {contact.jid}</p>
      <p>Status: {contact.status}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

export default ContactDetails;
