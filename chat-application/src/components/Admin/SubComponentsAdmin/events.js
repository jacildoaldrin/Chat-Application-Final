import React from "react";
import axios from "axios";
import Moment from "moment";
import { MDBDataTable } from "mdbreact";

class AdminEvents extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      columns: [
        { label: "ID", field: "id", sort: "asc", width: 150 },
        { label: "Type", field: "type", sort: "asc", width: 150 },
        { label: "Date", field: "date", sort: "asc", width: 150 },
        { label: "Time", field: "time", sort: "asc", width: 150 },
        { label: "User", field: "user", sort: "asc", width: 150 },
        { label: "Room", field: "room", sort: "asc", width: 150 },
        { label: "Description", field: "description", sort: "asc", width: 150 },
      ],
      rows: [],
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    axios.get("https://chat-application-backend.herokuapp.com/event/event-history").then((res) => {
      this.setState({
        rows: res.data,
      });
      let newArr = [];
      for (let x in this.state.rows) {
        let event = {
          id: this.state.rows[x]._id,
          type: this.state.rows[x].type,
          date: Moment(new Date(this.state.rows[x].date)).format("MM/DD/YYYY"),
          time: Moment(new Date(this.state.rows[x].date)).format("hh:mm:ss"),
          user: this.state.rows[x].user,
          room: this.state.rows[x].room,
          description: this.state.rows[x].description,
        };

        newArr.push(event);
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
          small
          data={this.state}
          className="mdb"
        ></MDBDataTable>
      </div>
    );
  }
}

export default AdminEvents;
