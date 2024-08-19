// src/components/FileTransfer.jsx
import React, { useState } from 'react';

const FileTransferComponent = ({ contactId }) => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('contactId', contactId);

    const response = await fetch('/send-file', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('File sent successfully');
    } else {
      alert('Failed to send file');
    }
  };

  return (
    <div>
      <h2>File Transfer</h2>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleSendFile}>Send File</button>
    </div>
  );
};

export default FileTransferComponent;
