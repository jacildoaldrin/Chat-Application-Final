import React, { useState } from "react";
import {
  Table,
  Modal,
  Button,
  Form
} from "react-bootstrap";
import axios from "axios";
import Moment from "moment";
import Rooms from './rooms';

function RoomAdd() {
  const [show, setShow] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomStatus, setRoomStatus] = useState('active');
  const [roomsList, setRoomsList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeRoom = (event) => {
    setRoomName(event.target.value);
    //console.log(roomName);
  }
  const handleChangeStatus = (event) => {
      setRoomStatus(event.target.value);
      //console.log(roomStatus);
  }
  const addRoom = () => {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    axios
      .post(
        "http://localhost:5000/room/create-room",
        { roomname: roomName,
            created: dateStringify,
            edited: "",
            status: roomStatus },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        //console.log(res);
        alert('A Room was created!');
        handleClose();
        window.location.reload();
      });
  }
 
  return (
    <>
      <div style={{ width: "10em", margin: "1em", marginTop: "2em" }}>
        <Button variant="primary" onClick={handleShow}>
          Add Room
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addRoom}>
            <Form.Group controlId="roomName">
              <Form.Label>Room Name</Form.Label>
              <Form.Control onChange={handleChangeRoom} type="text" placeholder="Enter Room Here" required />
            </Form.Group>
            <Form.Group controlId="roomStatu">
              <Form.Label>Room Status</Form.Label>
            <Form.Control  as="select" value={roomStatus} onChange={handleChangeStatus}>
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
      <Rooms/>
    </>
  );
}

export default RoomAdd;
