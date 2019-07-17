import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

const socket = io('https://121.254.173.45:3333');

function App() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('chat message', text);
    setText('');
  };

  useEffect(() => {
    socket.on('chat message', function(newMsg) {
      setMessages(prev => [...prev, newMsg]);
    });
  }, []);

  return (
    <div className="App">
      <header class="App-header">
      <img src={logo} className="App-header" alt="logo" />
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleChange} />
        <button type="submit">Go</button>
      </form>
      <ul>
        {messages.map(v => (
          <li>{v}</li>
        ))}
      </ul>
      </header>
    </div>
  );
}

export default App;
