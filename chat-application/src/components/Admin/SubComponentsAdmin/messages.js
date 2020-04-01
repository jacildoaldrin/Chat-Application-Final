import React from "react";
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'moment';


class AdminMessages extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      myMessages: []
    };
  }

  componentDidMount(){
    this.fetchEvents();
  }

  fetchEvents() {
      axios.get("http://localhost:5000/message/message-history").then( res => {
        //this.state.events = res.data;
        this.setState({
            myMessages: res.data
        });
        //console.log(res.data);
      });
  }

  renderTableData() {
    return this.state.myMessages.map((myMessage, index) => {
      const { _id, sender, room, message, type, date } = myMessage; //destructuring
      return (
        <tr key={_id}>
          <td>{sender}</td>
          <td>{room}</td>
          <td>{message}</td>
          <td>{type}</td>
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
      <th>Sender</th>
      <th>Room</th>
      <th>Message</th>
      <th>Type</th>
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

export default AdminMessages;
