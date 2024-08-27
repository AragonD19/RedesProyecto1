// components/ChatPage.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Chat from './Chat';
import ContactDetails from './ContactDetails';

const ChatPage = ({ connection, setContacts }) => {
    const { jid } = useParams();
    const navigate = useNavigate(); // Hook para la navegación
    const [contact, setContact] = React.useState(null);

  // Fetch contact details using jid
  React.useEffect(() => {
    if (jid) {
      // Aquí puedes buscar el contacto en tu lista de contactos o hacer una llamada a la API
      setContact({ jid: jid, name: jid, status: 'online' });
    }
  }, [jid]);

  const handleBackToContacts = () => {
    navigate('/'); // Redirige a la página de contactos
  };

  return (
    <div className="chat-page">
        <button onClick={handleBackToContacts}>Back to Contacts</button>
      {contact && (
        <>
          <ContactDetails contact={contact} />
          <Chat contact={contact} connection={connection} />
        </>
      )}
    </div>
  );
};

export default ChatPage;
