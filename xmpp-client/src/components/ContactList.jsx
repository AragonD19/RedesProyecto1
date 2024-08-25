// components/ContactList.jsx
import React from 'react';
import './ContactList.css'; // Asegúrate de crear este archivo CSS

const ContactList = ({ contacts, onSelectContact, onRemoveContact }) => {
  return (
    <div className="contact-list">
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <span>{contact}</span>
            <button onClick={() => onSelectContact(contact)}>Chat</button>
            <button onClick={() => onRemoveContact(contact)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
