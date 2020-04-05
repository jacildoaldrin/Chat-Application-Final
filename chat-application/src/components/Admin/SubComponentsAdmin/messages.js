import React from "react";
//import { Table } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'moment';
import { MDBDataTable } from 'mdbreact';


class AdminMessages extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      columns: [
        {label: 'Sender',
        field: 'sender',
        width: 150},
        {label: 'Room',
        field: 'room',
        width: 150},
        {label: 'Message',
        field: 'messages',
        width: 150},
        {label: 'Type',
        field: 'type',
        width: 150},
        {label: 'Date',
        field: 'date',
        width: 150},
        {label: 'Time',
        field: 'time',
        width: 150},
      ],
        rows: []  
    };
  }

  componentDidMount(){
    this.fetchEvents();
  }

  fetchEvents() {
      axios.get("http://localhost:5000/message/message-history").then( res => {
        this.setState({
            rows: res.data
        });
        let newArr = [];
        for (let x in this.state.rows) {
          let newObject = {};
          newObject.sender = this.state.rows[x].sender;
          newObject.room = this.state.rows[x].room;
          newObject.messages = this.state.rows[x].message;
          newObject.type = this.state.rows[x].type;
          newObject.date = Moment(new Date(this.state.rows[x].date)).format("YYYY-MM-DD");
          newObject.time = Moment(new Date(this.state.rows[x].date)).format("hh:mm:ss");
          newArr.push(newObject);
        }
        this.setState({
          rows: newArr
        });
      });
  }
  
  render() {
    return (
      <>
      <br></br>
      <MDBDataTable
        striped
        bordered
        small
        data={this.state}>  
    </MDBDataTable>
    </>
    );
  }
}

export default AdminMessages;
