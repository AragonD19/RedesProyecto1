// components/ContactList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {Strophe} from 'strophe.js';
import Chat from './Chat';
import ContactDetails from './ContactDetails';

const ContactList = ({ connection, setContacts }) => {
  const [newContact, setNewContact] = useState('');
  const [contacts, setLocalContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchRoster = useCallback(() => {
    if (connection) {
      const iq = $iq({ type: 'get' }).c('query', { xmlns: 'jabber:iq:roster' });

      connection.sendIQ(iq, (iqResult) => {
        const items = iqResult.getElementsByTagName('item');
        console.log('Roster items:', items);

        const rosterContacts = Array.from(items).map(item => {
          const jid = item.getAttribute('jid');
          const name = item.getAttribute('name') || Strophe.getNodeFromJid(jid);
          return {
            jid: jid,
            name: name,
            status: 'offline'
          };
        });

        // Send a presence probe to update contact statuses
        rosterContacts.forEach(contact => {
          connection.send($pres({ to: contact.jid, type: 'probe' }));
        });

        setLocalContacts(rosterContacts);
        setContacts(rosterContacts);
        console.log('Roster fetched:', rosterContacts);

      }, (error) => {
        console.error('Error fetching roster:', error);
      });
    }
  }, [connection, setContacts]);

  useEffect(() => {
    fetchRoster();
  }, [fetchRoster]);

  useEffect(() => {
    if (connection) {
      connection.addHandler(handlePresence, null, 'presence');
    }

    function handlePresence(presence) {
      const from = Strophe.getBareJidFromJid(presence.getAttribute('from'));
      const type = presence.getAttribute('type');

      let status = 'offline';
      if (type === 'subscribe') {
        console.log(`Friend request from ${from}`);
      } else if (type === 'unavailable') {
        console.log(`${from} is offline`);
        status = 'offline';
      } else {
        const statusElement = presence.getElementsByTagName('status')[0];
        status = statusElement ? statusElement.textContent : 'online';
      }

      setLocalContacts(contacts => {
        const updatedContacts = contacts.map(contact =>
          contact.jid === from ? { ...contact, status: status } : contact
        );
        return updatedContacts;
      });
      return true;
    }
  }, [connection]);

  const addContact = () => {
    if (connection && newContact) {
      connection.send(
        $pres({ to: newContact + '@alumchat.lol', type: 'subscribe' })
      );
      setNewContact('');
    }
  };

  const handleDeleteContact = (jid) => {
    setContacts(contacts => contacts.filter(contact => contact.jid !== jid));
    // Aquí podrías agregar la lógica para enviar un "unsubscribe" al servidor si es necesario.
  };
  
  return (
    <div className="contact-list">
      <h2>Contacts</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.jid} onClick={() => setSelectedContact(contact)}>
            {contact.name} - {contact.status}
            <button onClick={() => handleDeleteContact(contact.jid)}>Eliminar</button>
          </li>

        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newContact}
          onChange={(e) => setNewContact(e.target.value)}
          placeholder="Enter username"
        />
        <button onClick={addContact}>Add Contact</button>
      </div>
      {selectedContact && (
        <>
          <ContactDetails contact={selectedContact} />
          <Chat contact={selectedContact} connection={connection} />
        </>
      )}
    </div>
  );
};

export default ContactList;
