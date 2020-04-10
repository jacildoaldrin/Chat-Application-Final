import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

// components
import RoomAdd from "./RoomAdd";
import RoomList from "./RoomList";

const endpoint = "https://chat-application-backend.herokuapp.com";

const Room = () => {
  const [rooms, setRooms] = useState([]);

  const [showAdd, setShowAdd] = useState(Boolean);
  const [showEdit, setShowEdit] = useState(Boolean);

  const [currId, setCurrId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
 
  // closes the modal
  const closeAdd = () => {
    setRoomName("");
    setRoomStatus("active");
    setShowAdd(false);
  };
  const closeEdit = () => {
    setRoomName("");
    setRoomStatus("active");
    setShowEdit(false);
  };

  // opens the modal
  const openAdd = () => setShowAdd(true);
  const openEdit = () => setShowEdit(true);

  useEffect(() => {
    setRoomStatus("active");
    getRooms();
  }, []);

  // fetching all rooms
  const getRooms = () => {
    axios.get(`${endpoint}/room/room-list`).then((res) => {
      setRooms(res.data);
    });
  };

  // deleting room
  const deleteRoom = (event, room) => {
    event.preventDefault();
    console.log(room);
    axios.delete(`${endpoint}/room/remove-room/${room._id}`).then((res) => {
      getRooms();
    });
  };

  // adding new room
  const addRoom = (event) => {
    event.preventDefault();
    let room = {
      roomname: roomName,
      created: new Date(),
      edited: null,
      status: roomStatus,
    };
    axios
      .post(
        "https://chat-application-backend.herokuapp.com/room/create-room",
        room,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        closeAdd();
        getRooms();
      });
  };

  const editRoom = (event) => {
    event.preventDefault();
    axios
      .put(
        `https://chat-application-backend.herokuapp.com/room/room-status-update/${currId}`,
        {
          roomname: roomName,
          edited: new Date(),
          status: roomStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        closeEdit();
        getRooms();
      });
  };

  const editModal = (event, room) => {
    event.preventDefault();
    setRoomName(room.roomname);
    setRoomStatus(room.status);
    setCurrId(room._id);
    openEdit();
  };

  return (
    <div>
      <div
        style={{
          width: "10em",
          margin: "1em",
          marginTop: "2em",
          marginLeft: "3%",
        }}
      >
        <Button variant="primary" onClick={openAdd}>
          Add Room
        </Button>
      </div>
      <div className="modal">
        <RoomAdd
          showAdd={showAdd}
          closeAdd={closeAdd}
          addRoom={addRoom}
          roomName={roomName}
          setRoomName={setRoomName}
          roomStatus={roomStatus}
          setRoomStatus={setRoomStatus}
        />
      </div>

      <RoomList
        rooms={rooms}
        closeEdit={closeEdit}
        editRoom={editRoom}
        showEdit={showEdit}
        roomName={roomName}
        roomStatus={roomStatus}
        setRoomName={setRoomName}
        setRoomStatus={setRoomStatus}
        editModal={editModal}
        deleteRoom={deleteRoom}
      />
    </div>
  );
};

export default Room;
