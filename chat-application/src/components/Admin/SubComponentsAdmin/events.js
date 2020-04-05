import React from "react";
import axios from 'axios';
import Moment from 'moment';
import { MDBDataTable } from 'mdbreact';


class AdminEvents extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      columns: [
      {label: 'User',
      field: 'user',
      width: 150},
      {label: 'Room',
      field: 'room',
      width: 150},
      {label: 'Type',
      field: 'type',
      width: 150},
      {label: 'Description',
      field: 'description',
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
      axios.get("http://localhost:5000/event/event-history").then( res => {
        this.setState({
          rows: res.data
        });
        let newArr = [];
        for (let x in this.state.rows) {
          //console.log(x);
          //console.log(Moment(new Date(this.state.rows[x].date)).format("YYYY-MM-DD"));
          let newObject = {};
          newObject.user = this.state.rows[x].user;
          newObject.room = this.state.rows[x].room;
          newObject.type = this.state.rows[x].type;
          newObject.description = this.state.rows[x].description;
          newObject.date = Moment(new Date(this.state.rows[x].date)).format("YYYY-MM-DD");
          newObject.time = Moment(new Date(this.state.rows[x].date)).format("hh:mm:ss");
          newArr.push(newObject);
        }
        this.setState({
          rows: newArr
        });
      });
  }

  // renderTableData() {
  //   return this.state.events.map((event, index) => {
  //     const { _id, user, room, type, description, date } = event; //destructuring
  //     return (
  //       <tr key={_id}>
  //         <td>{user}</td>
  //         <td>{room}</td>
  //         <td>{type}</td>
  //         <td>{description}</td>
  //         <td>{Moment(new Date(date)).format("YYYY-MM-DD")}</td>
  //         <td>{Moment(new Date(date)).format("hh:mm:ss")}</td>
  //       </tr>
  //     );
  //   });
  // }

  render() {
    return (
  //     <div style={{width: "90%", marginLeft: "auto", marginRight:"auto", marginTop: "3em"}}>
  //       <Table striped bordered hover variant="dark" id="students">
  //       <thead>
  //   <tr>
  //     <th>User</th>
  //     <th>Type</th>
  //     <th>Room</th>
  //     <th>Description</th>
  //     <th>Date</th>
  //     <th>Time</th>
  //   </tr>
  // </thead>
  //         <tbody>{this.renderTableData()}</tbody>
  //       </Table>
  //     </div>
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

export default AdminEvents;
