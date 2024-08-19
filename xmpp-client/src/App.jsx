import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterComponent from "./components/Register";
import LoginComponent from "./components/Login";
import LogoutComponent from "./components/Logout";
import DeleteAccountComponent from "./components/DeleteAccount";
import ContactsComponent from "./components/Contacts";
import ChatComponent from "./components/Chat";
import GroupChatComponent from "./components/GroupChat";
import PresenceComponent from "./components/Presence";
import NotificationsComponent from "./components/Notifications";
import FileTransferComponent from "./components/FileTransfer";
import Home from "./components/Home";  // Importar el nuevo componente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/logout" element={<LogoutComponent />} />
        <Route path="/delete" element={<DeleteAccountComponent />} />
        <Route path="/contacts" element={<ContactsComponent />} />
        <Route path="/chat/:contactId" element={<ChatComponent />} />
        <Route path="/group-chat/:groupId" element={<GroupChatComponent />} />
        <Route path="/presence" element={<PresenceComponent />} />
        <Route path="/notifications" element={<NotificationsComponent />} />
        <Route path="/file-transfer/:contactId" element={<FileTransferComponent />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
