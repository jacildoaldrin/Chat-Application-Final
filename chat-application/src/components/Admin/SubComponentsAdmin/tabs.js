import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import  AdminEvents  from './events';
import AdminMessage from './messages';
import RoomAdd from './roomAdd';

class AdminTabs extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  state = {};
  render() {
    return (
      <>
      <Tabs defaultActiveKey="rooms" id="uncontrolled-tab-example">
        <Tab eventKey="eventHistory" title="Event History">
          <AdminEvents/>
        </Tab>
        <Tab eventKey="messageHistory" title="Message History">
          <AdminMessage/>
        </Tab>
        <Tab eventKey="rooms" title="Rooms">
          <RoomAdd/>
        </Tab>
      </Tabs>
      </> 
    );
  }
}

export default AdminTabs;
