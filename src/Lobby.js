import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';

const Root = styled.div`
  max-width: 1200px;
`;

const Paper = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  box-shadow: none;
  &:hover {
    box-shadow: 3px 3px 0 0 crimson;
  }
  transition: box-shadow 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 32px;
`;

const ROOMS = [
  {
    name: 'Room 1',
  },
  {
    name: 'Room 2',
  },
  {
    name: 'Room 3',
  },
];

function Lobby() {
  const [room, setRoom] = useState(null);
  if (room) {
    return <ChatRoom room={room} />;
  }

  const handleClick = name => () => {
    setRoom(name);
  }

  return (
    <Root>
      <h1>Rooms are goes here</h1>
      <Container>
        {ROOMS.map(({ name }) => (
          <Paper onClick={handleClick(name)}>{name}</Paper>
        ))}
      </Container>
    </Root>
  );
}

export default Lobby;
