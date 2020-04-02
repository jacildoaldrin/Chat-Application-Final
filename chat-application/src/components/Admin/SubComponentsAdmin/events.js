import React from "react";
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'moment';


class AdminEvents extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      events: []
    };
  }

  componentDidMount(){
    this.fetchEvents();
  }

  fetchEvents() {
      axios.get("http://localhost:5000/event/event-history").then( res => {
        this.setState({
            events: res.data
        });
      });
  }

  renderTableData() {
    return this.state.events.map((event, index) => {
      const { _id, user, room, type, description, date } = event; //destructuring
      return (
        <tr key={_id}>
          <td>{user}</td>
          <td>{room}</td>
          <td>{type}</td>
          <td>{description}</td>
          <td>{Moment(new Date(date)).format("YYYY-MM-DD")}</td>
          <td>{Moment(new Date(date)).format("hh:mm:ss")}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div style={{width: "90%", marginLeft: "auto", marginRight:"auto", marginTop: "3em"}}>
        <Table striped bordered hover variant="dark" id="students">
        <thead>
    <tr>
      <th>User</th>
      <th>Type</th>
      <th>Room</th>
      <th>Description</th>
      <th>Date</th>
      <th>Time</th>
    </tr>
  </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </div>
    );
  }
}

export default AdminEvents;
