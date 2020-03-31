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
  const [typing, setTyping] = useState([]);

  useEffect(() => {
    const { username } = queryString.parse(location.search);
    const { room } = queryString.parse(location.search);
    setName(username);
    setRoom(room)

    socket = io(endpoint);
    socket.emit("new-user", {username, room});
  }, [location.search]);

  useEffect(() => {
    socket.on("chat-message", message => {
      setMessages([...messages, message]);
    });
  }, [messages]);


  useEffect(() => {
    socket.on("typing", data => {
      if(data.typing){
        // Checks if the user currently typinng
        var check = true;
        for (const element of typing) {
          if(element.username === data.username){
            check = false;
            break;
          }
        }
        if(check){
          setTyping([...typing, {username: data.username, message: `${data.username} is typing something`}]);
        }
      }else{
        var filtered = typing.filter(element => element.username !== data.username)
        setTyping(filtered);
      }
    });
  }, [username, typing])

  const userTyping = event => {
    event.preventDefault();
    socket.emit('user-typing', true);
  }

  const userStoppedTyping = event => {
    event.preventDefault();
    socket.emit('user-typing', false);
  }

  const sendMessage = event => {
    event.preventDefault();
    socket.emit("send-message", message, () => {setMessage('')});
    userStoppedTyping(event);
  };

  const joinRoom = event => {
    event.preventDefault();
    socket.emit("join-room", room);
  }

  return (
  <>
  <Chatbox messages={messages} username={username} typing={typing}/>
  <Inputbox message={message} setMessage={setMessage} sendMessage={sendMessage} userTyping={userTyping}/>
  </>
  );
};

export default Chat;
