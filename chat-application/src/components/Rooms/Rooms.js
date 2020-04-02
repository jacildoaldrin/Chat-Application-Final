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
              onClick={event =>
                props.currentroom === room.roomname
                  ? event.preventDefault()
                  : props.switchRoom(event, room.roomname)
              }
            >
              {props.currentroom === room.roomname ? (
                <div className="room-item active">
                  <i className="material-icons enter-icon mr-5">input</i>
                  <strong>{room.roomname}</strong>
                </div>
              ) : (
                <div className="room-item">
                  <i className="material-icons enter-icon mr-5">input</i>
                  <strong>{room.roomname}</strong>
                </div>
              )}
            </div>
          </div>
        ))}
      </ScrollToBottom>
    </>
  );
};

export default Rooms;
