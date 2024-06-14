import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const UserSocketComponent = () => {
  const [message, setMessage] = useState('');
  const [adminReply, setAdminReply] = useState('');
  const socket = io('http://localhost:3008');

  useEffect(() => {
    socket.on('userReply', (message) => {
      setAdminReply(message);
    });

    /*return () => {
      socket.disconnect();
    };*/
  }, []);

  const sendMessage = () => {
    socket.emit('userMessage', message);
    setMessage('');
  };

  return (
    <div>
      <h1>Componente de usuario</h1>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Enviar Mensaje</button>
      {adminReply && <div>Respuesta del administrador: {adminReply}</div>}
    </div>
  );
};

export default UserSocketComponent;
