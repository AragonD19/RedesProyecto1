// components/GroupPage.jsx
import React from 'react';
import GroupList from './GroupList';

const GroupPage = ({ connection }) => {
  return (
    <div className="group-page">
      <h1>Public Groups</h1>
      <GroupList connection={connection} />
    </div>
  );
};

export default GroupPage;
