// src/components/Contacts.jsx
import React, { useEffect, useState } from 'react';
import PageContainer from './PageContainer';

const ContactsComponent = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch('/contacts');
      const data = await response.json();
      setContacts(data);
    };

    fetchContacts();
  }, []);

  return (
    <PageContainer>
      <h2 style={{ color: "#388e3c" }}>Contacts</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {contacts.map((contact) => (
          <li key={contact.id} style={{
            backgroundColor: "#ffffff",
            border: "1px solid #b2dfdb",
            borderRadius: "5px",
            margin: "10px 0",
            padding: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}>
            {contact.name} - {contact.status}
          </li>
        ))}
      </ul>
    </PageContainer>
  );
};

export default ContactsComponent;
