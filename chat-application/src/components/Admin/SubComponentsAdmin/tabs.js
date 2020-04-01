import React from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import  AdminEvents  from './events'

class AdminTabs extends React.Component {
  state = {};
  render() {
    return (
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <AdminEvents/>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <p>Message History Here</p>
        </Tab>
        <Tab eventKey="contact" title="Contact">
          <p>Rooms Here</p>
        </Tab>
      </Tabs>
    );
  }
}

export default AdminTabs;
