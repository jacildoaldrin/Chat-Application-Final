import React from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import Moment from "moment";

const RoomList = (props) => {
  return (
    <div
      style={{
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "3em",
      }}
    >
      <Table striped bordered hover variant="dark" id="students">
        <thead>
          <tr>
            <th>ID</th>
            <th>Room</th>
            <th>Create Date</th>
            <th>Edit Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.rooms.map((room, index) => (
            <tr key={index}>
              <td>{room._id}</td>
              <td>{room.roomname}</td>
              <td>
                {Moment(new Date(room.created)).format(
                  "MM/DD/YYYY - hh:mm:ss a"
                )}
              </td>
              <td>
                {room.edited
                  ? Moment(new Date(room.edited)).format(
                      "MM/DD/YYYY - hh:mm:ss a"
                    )
                  : "Not Applicable"}
              </td>
              <td>{room.status}</td>
              <td>
                <div>
                  <button
                    variant="primary"
                    onClick={(event) => props.editModal(event, room)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    variant="primary"
                    onClick={(event) => props.deleteRoom(event, room)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br></br>
      <Modal show={props.showEdit} onHide={props.closeEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => props.editRoom(event)}>
            <Form.Group controlId="roomName">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                value={props.roomName}
                onChange={(event) => props.setRoomName(event.target.value)}
                type="text"
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
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoomList;
