import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import axios from "axios";
import { useHistory } from "react-router-dom";

// style
import "./Chatroom.css";

// components
import Inputbox from "../Inputbox/Inputbox";
import Chatbox from "../Chatbox/Chatbox";
import Rooms from "../Rooms/Rooms";
import Chatinfo from "../Chatinfo/Chatinfo";
import Roomsinfo from "../Roomsinfo/Roomsinfo";
import Exit from "../Exit/Exit";

// for local
// const port = process.env.port || 5000;
// const endpoint = `http://localhost:${port}`;

// heroku server
const endpoint = "https://chat-application-backend.herokuapp.com";
let socket;


const Chatroom = ({ location }) => {
  const history = useHistory();
  const [username, setName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { username } = queryString.parse(location.search);
    const room = "Default";
    setName(username);
    setRoom(room);
    getRooms();
    
    socket = io(endpoint);
    socket.emit("new-user", { username, room }, (error) => {
      if (error) {
        history.push("/", alert(error.error));
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.disconnect();
    };
  }, [location.search]);

  // listens for event new-room
  useEffect(() => {
    socket.on("new-room", (room) => {
      setRoom(room);
    });
  }, [room]);

  // messages received
  useEffect(() => {
    socket.on("chat-message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  // sends a message
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("send-message", message);
      setMessage("");
    }
  };

  // get all rooms from the database
  const getRooms = () => {
    axios.get(`${endpoint}/room/room-list-active`).then((res) => {
      setRooms(res.data);
    });
  };

  // leaves and joins a new room
  const switchRoom = (event, newRoom) => {
    event.preventDefault();
    setMessages([]);
    socket.emit("leave-room");
    socket.emit("join-room", newRoom);
  };

  return (
    <>
      <div className="outerContainer">
        <div className="chatContainer">
          <Chatinfo username={username} room={room} />
          <Chatbox messages={messages} username={username} />
          <Inputbox
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <div className="roomsContainer">
          <div className="roomList">
            <Roomsinfo />
            <div className="roomList-innerContainer">
              <Rooms
                rooms={rooms}
                currentroom={room}
                username={username}
                switchRoom={switchRoom}
              />
              <Exit />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatroom;
