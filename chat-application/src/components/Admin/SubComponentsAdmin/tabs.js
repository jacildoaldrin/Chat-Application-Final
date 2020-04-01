import React from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import  AdminEvents  from './events'

class AdminTabs extends React.Component {
  state = {};
  render() {
    return (
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="eventHistory" title="Event History">
          <AdminEvents/>
        </Tab>
        <Tab eventKey="messageHistory" title="Message History">
          <p>Message History Here</p>
        </Tab>
        <Tab eventKey="rooms" title="Rooms">
          <p>Rooms Here</p>
        </Tab>
      </Tabs>
    );
  }
}

export default AdminTabs;
