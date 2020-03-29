import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from 'socket.io-client';

const port = process.env.port || 5000;
const endpoint = `localhost:${port}`;

let socket;

const Chat = ({ location }) => {
  const [username, setName] = useState("");

  useEffect(()=>{
    const { username } = queryString.parse(location.search);
    setName(username);

    socket = io(endpoint);
    socket.emit('new-user', username);    
  }, [location.search]);

  return (
  <>
    <h1>Welcome to the room {username}</h1>
  </>
  );
};

export default Chat;
