import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

// style
import "./Chatroom.css";

// components
import Inputbox from "../Inputbox/Inputbox";
import Chatbox from "../Chatbox/Chatbox";
import axios from "axios";

const port = process.env.port || 5000;
const endpoint = `localhost:${port}`;

let socket;

const Chat = ({ location }) => {
  const [username, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const logConnectToApp = (username, room) => {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    //Event Log
    axios.post(
      "http://localhost:5000/event/create-event",
      {
        user: username,
        room: room,
        type: "socket",
        description: "connected to Chat App",
        date: dateStringify
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  };

  useEffect(() => {
    const { username } = queryString.parse(location.search);
    const { room } = queryString.parse(location.search);
    setName(username);
    setRoom(room);

    socket = io(endpoint);
    socket.emit("new-user", { username, room });
  }, [location.search]);

  //
  useEffect(() => {
    socket.on("chat-message", message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // sends a message
  const sendMessage = event => {
    event.preventDefault();
    socket.emit("send-message", message, () => {
      setMessage("");
    });
  };

  // function to join a room
  const joinRoom = event => {
    event.preventDefault();
    socket.emit("join-room", room);
  };

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <Chatbox messages={messages} username={username} />
        <Inputbox message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  );
};

export default Chat;
