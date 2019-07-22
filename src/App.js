import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

const socket = io('http://121.254.173.45:3333');

function App() {
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('new message', text);
    setMessages(prev => [...prev, { username, message: text }]);
    setText('');
  };

  useEffect(() => {
    socket.on('new message', function(messageObj) {
      setMessages(prev => [...prev, messageObj]);
    });
  }, []);

  if (!submitted) {
    return (
      <div style={{ padding: '1em' }}>
        <p>insert username</p>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button
          onClick={() => {
            setSubmitted(true);
            socket.emit('add user', username);
          }}
        >
          submit
        </button>
      </div>
    );
  }

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
    </div>
  );
}

export default App;
