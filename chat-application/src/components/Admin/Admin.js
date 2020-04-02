import React from 'react';
import AdminTabs from './SubComponentsAdmin/tabs';

import "./Admin.css";

const Admin = () => {
    return ( 
        
        <div id="body">
        <h1>Admin Page</h1>
        <AdminTabs/>
        </div>
     );
}
 
export default Admin;