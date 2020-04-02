import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import axios from "axios";

// style
import "./Chatroom.css";

// components
import Inputbox from "../Inputbox/Inputbox";
import Chatbox from "../Chatbox/Chatbox";
import Rooms from "../Rooms/Rooms";
import Chatinfo from "../Chatinfo/Chatinfo";
import Roomsinfo from "../Roomsinfo/Roomsinfo";

const port = process.env.port || 5000;
const endpoint = `http://localhost:${port}`;

let socket;

const Chat = ({ location }) => {
  const [username, setName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { username } = queryString.parse(location.search);
    const { room } = queryString.parse(location.search);
    setName(username);
    setRoom(room);
    getRooms();
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
  const joinRoom = (event, roomname) => {
    event.preventDefault();
    // socket.emit("join-room", roomname);
    setRoom(roomname);
  };

  const getRooms = () => {
    axios.get(`${endpoint}/room/room-list`).then(res => {
      setRooms(res.data);
      console.log(res.data);
    });
  };

  return (
    <>
      <div className="outerContainer">
        <div className="chatContainer">
          <Chatinfo username={username} room={room} />
          <Chatbox messages={messages} username={username} />
          <Inputbox message={message} setMessage={setMessage} sendMessage={sendMessage}
          />
        </div>
        <div className="roomsContainer">
          <div className="roomList">
            <Roomsinfo />
            <Rooms rooms={rooms} joinRoom={joinRoom}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
