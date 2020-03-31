import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chatroom.css";
import Inputbox from '../Inputbox/Inputbox';
import Chatbox from "../Chatbox/Chatbox";

const port = process.env.port || 5000;
const endpoint = `localhost:${port}`;

let socket;

const Chat = ({ location }) => {
  const [username, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { username } = queryString.parse(location.search);
    const { room } = queryString.parse(location.search);
    setName(username);
    setRoom(room)

    socket = io(endpoint);
    socket.emit("new-user", {username, room});
  }, [location.search]);

  useEffect(() => {
    socket.on("chat-message", data => {
      setMessages([...messages, (`${data.username}: ${data.message}`)]);
    });
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();
    socket.emit("send-message", message);
    setMessage('')
  };

  const joinRoom = event => {
    event.preventDefault();
    socket.emit("join-room", room);
  }

  console.log(messages);

  return (
  <>
  <Chatbox messages={messages} />
  <Inputbox message={message} setMessage={setMessage} sendMessage={sendMessage} />
  </>
  );
};

export default Chat;
