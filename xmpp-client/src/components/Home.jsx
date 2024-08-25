// components/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddContact from './AddContact';
import ContactList from './ContactList';
import './Home.css';

const Home = ({ connection, onLogout }) => {
  const [showContacts, setShowContacts] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar contactos desde localStorage al montar el componente
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const handleShowContacts = () => {
    setShowContacts(!showContacts);
  };

  const addContactToList = (contactJID) => {
    setContacts((prevContacts) => {
      if (prevContacts.includes(contactJID)) {
        return prevContacts; // Contacto ya existe
      }
      const updatedContacts = [...prevContacts, contactJID];
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  const handleSelectContact = (contactJID) => {
    setSelectedContact(contactJID);
    navigate(`/chat/${contactJID}`);
  };

  const handleRemoveContact = (contactJID) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.filter(contact => contact !== contactJID);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  return (
    <div className="home-container">
      <h1>Welcome to Chat App</h1>
      <div className="home-buttons">
        <button onClick={handleShowContacts} className="home-btn">
          {showContacts ? 'Hide Contacts' : 'Show Contacts'}
        </button>
        {showContacts && (
          <ContactList
            contacts={contacts}
            onSelectContact={handleSelectContact}
            onRemoveContact={handleRemoveContact}
          />
        )}
        <AddContact connection={connection} onAddContact={addContactToList} />
        <button onClick={onLogout} className="home-btn">Logout</button>
      </div>
    </div>
  );
};

export default Home;
