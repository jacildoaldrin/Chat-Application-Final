import React from "react";
import AdminTabs from "./SubComponentsAdmin/tabs";

import "./Admin.css";

const Admin = () => {
  return (
    <div id="body">
      <h1>
        <i className="material-icons enter-icon mr-2" id="adminIcon">perm_identity</i>
        <b>Admin Page</b>
      </h1>
      <AdminTabs />
    </div>
  );
};

export default Admin;
