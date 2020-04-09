import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Rooms from "./room-list";

function RoomAdd() {
  const [show, setShow] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomStatus, setRoomStatus] = useState("active");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeRoom = (event) => {
    setRoomName(event.target.value);
  };
  const handleChangeStatus = (event) => {
    setRoomStatus(event.target.value);
  };
  const addRoom = () => {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    axios
      .post(
        "https://chat-application-backend.herokuapp.com/room/create-room",
        {
          roomname: roomName,
          created: dateStringify,
          edited: null,
          status: roomStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert("A Room was created!");
        handleClose();
        window.location.reload();
      });
  };

  return (
    <div>
      <div style={{ width: "10em", margin: "1em", marginTop: "2em", marginLeft: "3%"}}>
        <Button variant="primary" onClick={handleShow}>
          Add Room
        </Button>
      </div>
      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={addRoom}>
              <Form.Group controlId="roomName">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  onChange={handleChangeRoom}
                  type="text"
                  placeholder="Enter Room Here"
                  required
                />
              </Form.Group>
              <Form.Group controlId="roomStatus">
                <Form.Label>Room Status</Form.Label>
                <Form.Control
                  as="select"
                  value={roomStatus}
                  onChange={handleChangeStatus}
                >
                  <option>active</option>
                  <option>inactive</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
      <Rooms />
    </div>
  );
}

export default RoomAdd;
