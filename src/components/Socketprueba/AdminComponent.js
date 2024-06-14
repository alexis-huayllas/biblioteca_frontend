import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const AdminSocketComponent = () => {
  const [adminMessages, setAdminMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const socket = io('http://localhost:3008');

  useEffect(() => {
    socket.on('adminMessage', (message) => {
      console.log('adminmessage run');
      console.log('message', message);
      setAdminMessages((prevMessages) => [...prevMessages, message]);
    });

    /*return () => {
      socket.disconnect();
    };*/
  }, []);

  const sendReply = () => {
    socket.emit('adminReply', replyMessage);
    setReplyMessage('');
  };

  return (
    <div>
      <h1>Componente de administrador</h1>
      <div>
        <h2>Mensajes de usuarios:</h2>
        <ul>
          {adminMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
      <input type="text" value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} />
      <button onClick={sendReply}>Enviar respuesta a usuarios</button>
    </div>
  );
};

export default AdminSocketComponent;