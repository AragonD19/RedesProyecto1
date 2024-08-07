import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterComponent from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import DeleteAccount from './components/DeleteAccount';
import Contacts from './components/Contacts';
import Chat from './components/Chat';
import GroupChat from './components/GroupChat';
import Presence from './components/Presence';
import Notifications from './components/Notifications';
import FileTransfer from './components/FileTransfer';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={RegisterComponent} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/delete" component={DeleteAccount} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/chat" component={Chat} />
        <Route path="/group-chat" component={GroupChat} />
        <Route path="/presence" component={Presence} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/file-transfer" component={FileTransfer} />
      </Switch>
    </Router>
  );
};

export default App;
