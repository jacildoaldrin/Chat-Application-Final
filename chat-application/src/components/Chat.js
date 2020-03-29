import React, { useState, useEffect } from "react";
import queryString from "query-string";

const Chat = ({ location }) => {
  const [username, setName] = useState("");

  useEffect(()=>{
    const { username } = queryString.parse(location.search);
    setName(username);
  }, [location.search]);

  return (
  <>
    <h1>Welcome to the room {username}</h1>
  </>
  );
};

export default Chat;
