import React, { useState, useEffect } from 'react';
import Lobby from './Lobby';
import logo from './logo.svg';
import { socket } from './App';
import './App.css';


function ChatRoom({ room }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('new room message', { room, message: text });
    // setMessages(prev => [...prev, { username, message: text }]);
    setText('');
  };

  useEffect(() => {
    socket.emit('join', { username: 'Annoying', room });
      
    socket.on('new room message', function(messageObj) {
      setMessages(prev => [...prev, messageObj]);
    });
  }, []);

  return (
    <div className="App">
      <header class="App-header">
        <img style={{ width: 400, height: 400 }} src={logo} alt="logo" />
        <form onSubmit={handleSubmit}>
          <input type="text" value={text} onChange={handleChange} />
          <button type="submit">Go</button>
        </form>
        <ul style={{ textAlign: 'left', listStyle: 'none' }}>
          {messages.map(({ username, message }) => (
            <li>{`${username}: ${message}`}</li>
          ))}
        </ul>
      </header>
      <button>Back</button>
    </div>
  );
}

export default ChatRoom;
