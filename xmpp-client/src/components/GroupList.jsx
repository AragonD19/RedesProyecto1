import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupList = ({ connection }) => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (connection) {
      const service = 'conference.alumchat.lol'; // Dominio del servicio de conferencias
      const discoQuery = $iq({
        from: connection.jid,
        to: service,
        type: 'get'
      }).c('query', { xmlns: 'http://jabber.org/protocol/disco#items' });

      connection.sendIQ(discoQuery, (result) => {
        const items = result.getElementsByTagName('item');
        const groupList = [];

        for (let i = 0; i < items.length; i++) {
          const jid = items[i].getAttribute('jid');
          const name = items[i].getAttribute('name') || jid;
          groupList.push({ name, jid });
        }

        setGroups(groupList);
      }, (error) => {
        console.error('Failed to retrieve public groups:', error);
      });
    }
  }, [connection]);

  const joinGroup = (groupJid) => {
    navigate(`/group/${groupJid}`);
  };

  return (
    <div>
      <h2>Public Groups</h2>
      <ul>
        {groups.map(group => (
          <li key={group.jid}>
            <span>{group.name}</span>
            <button onClick={() => joinGroup(group.jid)}>Join</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/groups')}>Back to Groups</button>
    </div>
  );
};

export default GroupList;
