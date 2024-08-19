// src/components/Notifications.jsx
import React, { useEffect, useState } from 'react';

const NotificationsComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch('/notifications');
      const data = await response.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, idx) => (
          <li key={idx}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsComponent;
