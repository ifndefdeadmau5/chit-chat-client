import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Lobby from './Lobby';
import './App.css';

export const socket = io('https://mysterious-mesa-27210.herokuapp.com/');

function App() {
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!submitted) {
    return (
      <form style={{ padding: '1em' }}>
        <p>insert username</p>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => {
            setSubmitted(true);
            socket.emit('add user', username);
          }}
        >
          submit
        </button>
      </form>
    );
  }

  return (
    <div className="App">
      <Lobby />
    </div>
  );
}

export default App;
