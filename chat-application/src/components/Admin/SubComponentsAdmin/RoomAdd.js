import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const RoomAdd = (props) => {
  return (
    <Modal show={props.showAdd} onHide={props.closeAdd}>
      <Modal.Header closeButton>
        <Modal.Title>Add Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={event => props.addRoom(event)}>
          <Form.Group controlId="roomName">
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              value={props.roomName}
              onChange={(event) => props.setRoomName(event.target.value)}
              placeholder="Enter Room Here"
              required
            />
          </Form.Group>

          <Form.Group controlId="roomStatus">
            <Form.Label>Room Status</Form.Label>
            <Form.Control
              as="select"
              value={props.roomStatus}
              onChange={(event) => props.setRoomStatus(event.target.value)}
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
  );
};

export default RoomAdd;
