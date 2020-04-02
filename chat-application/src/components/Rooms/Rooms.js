import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Rooms.css";
const Rooms = props => {
  return (
    <>
      <ScrollToBottom className="rooms-container">
        {props.rooms.map((room, index) => (
          <div key={index}>
            <div
              className="room-item"
              onClick={event => props.joinRoom(event, room.roomname)}
            >
              <i className="material-icons enter-icon mr-5">input</i>
              <strong>{room.roomname}</strong>
            </div>
          </div>
        ))}
      </ScrollToBottom>
    </>
  );
};

export default Rooms;
