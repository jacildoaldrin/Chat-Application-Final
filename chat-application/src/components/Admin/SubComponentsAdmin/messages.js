import React from "react";
//import { Table } from 'react-bootstrap';
import axios from "axios";
import Moment from "moment";
import { MDBDataTable } from "mdbreact";

class AdminMessages extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      columns: [
        { label: "ID", field: "id", sort: "asc", width: 150 },
        { label: "Date", field: "date", sort: "asc", width: 150 },
        { label: "Time", field: "time", sort: "asc", width: 150 },
        { label: "Sender", field: "sender", sort: "asc", width: 150 },
        { label: "Room", field: "room", sort: "asc", width: 150 },
        { label: "Message", field: "messages", sort: "asc", width: 150 },
        { label: "Type", field: "type", sort: "asc", width: 150 },
      ],
      rows: [],
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    axios.get("http://localhost:5000/message/message-history").then((res) => {
      this.setState({
        rows: res.data,
      });

      let newArr = [];

      for (let x in this.state.rows) {
        let message = {
          id: this.state.rows[x]._id,
          date: Moment(new Date(this.state.rows[x].date)).format("MM/DD/YYYY"),
          time: Moment(new Date(this.state.rows[x].date)).format("hh:mm:ss a"),
          sender: this.state.rows[x].sender,
          room: this.state.rows[x].room,
          messages: this.state.rows[x].message,
          type: this.state.rows[x].type,
        };
        newArr.push(message);
      }
      this.setState({
        rows: newArr,
      });
    });
  }

  render() {
    return (
      <div className="tableContainer">
        <MDBDataTable
          striped
          bordered
          hover
          data={this.state}
          className="mdb"
        />
      </div>
    );
  }
}

export default AdminMessages;
