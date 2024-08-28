// components/ContactList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Strophe } from 'strophe.js';
import { useNavigate } from 'react-router-dom';

const ContactList = ({ connection, setContacts }) => {
  const [newContact, setNewContact] = useState('');
  const [contacts, setLocalContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate(); // Hook para la navegación

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
      const presenceHandler = (presence) => {
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
        
        setContacts(contacts => {
          const updatedContacts = contacts.map(contact =>
            contact.jid === from ? { ...contact, status: status } : contact
          );
          return updatedContacts;
        });
        return true;
      };

      connection.addHandler(presenceHandler, null, 'presence');
    }
  }, [connection, setContacts]);

  const addContact = () => {
    if (connection && newContact) {
      connection.send(
        $pres({ to: newContact + '@alumchat.lol', type: 'subscribe' })
      );
      setNewContact('');
    }
  };

  const handleDeleteContact = (jid, e) => {
    e.stopPropagation(); // Evita que el clic en el botón propague el evento al li
    if (connection) {
      // Enviar solicitud de eliminar el contacto del servidor
      const iq = $iq({ type: 'set' })
        .c('query', { xmlns: 'jabber:iq:roster' })
        .c('item', { jid: jid, subscription: 'remove' });
  
      connection.sendIQ(iq, (result) => {
        console.log('Contact successfully removed:', result);
        // Eliminar el contacto de la lista local
        setLocalContacts(contacts => contacts.filter(contact => contact.jid !== jid));
        setContacts(contacts => contacts.filter(contact => contact.jid !== jid));
        setSelectedContact(null); // Opcionalmente, deseleccionar el contacto
      }, (error) => {
        console.error('Error removing contact:', error);
      });
    }
  };
  

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    navigate(`/chat/${contact.jid}`); // Redirige a la página de chat del contacto
  };

  return (
    <div className="contact-list">
      <h2>Contacts</h2>
      <ul>
        {contacts.map(contact => (
          <li
            key={contact.jid}
            onClick={() => handleContactClick(contact)}
          >
            {contact.name} - {contact.status}
            <button onClick={(e) => handleDeleteContact(contact.jid, e)}>Eliminar</button>
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
    </div>
  );
};

export default ContactList;
