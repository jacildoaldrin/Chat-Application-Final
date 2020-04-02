import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

// style
import "./Chatroom.css";

// components
import Inputbox from "../Inputbox/Inputbox";
import Chatbox from "../Chatbox/Chatbox";
import Info from "../Info/Info";

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
    setRoom(room);

    socket = io(endpoint);
    socket.emit("new-user", { username, room });
  }, [location.search]);

  useEffect(() => {
    socket.on("chat-message", message => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  // sends a message
  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit("send-message", message);
      setMessage("");
    }
  };

  // function to join a room
  const joinRoom = event => {
    event.preventDefault();
    socket.emit("join-room", room);
  };

  return (
    <>
      <div className="outerContainer">
        <div className="chatContainer">
          <div className="infoBar">
            <div className="leftChatContainer">
              <h3><strong className="mr-2">Username:</strong> {username}</h3>
            </div>
            <div className="leftChatContainer">
              <h3><strong className="mr-2">Room:</strong> {room}</h3>
            </div>
          </div>
          <Chatbox messages={messages} username={username} />
          <Inputbox message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
        <div className="roomContainer">
          <div className="infoBar">
            <div className="centerRoomContainer">
              <h3><strong>Room List</strong></h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
