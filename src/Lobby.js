import React, { useState, useEffect } from 'react';
import { socket } from './App';
import ChatRoom from './ChatRoom';

function Lobby() {


  return (
    <div>
      <div>Rooms are goes here</div>
      <ul>
        <li>Room1</li>
        <li>Room2</li>
        <li>Room3</li>
      </ul>
      <ChatRoom room="room1" />
    </div>
  );
}

export default Lobby;
