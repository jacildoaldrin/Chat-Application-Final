import React from "react";
import AdminTabs from "./SubComponentsAdmin/tabs";
import { Link } from 'react-router-dom';
import "./Admin.css";

const Admin = () => {
  return (
    <div id="body">
      <h1>
        <i className="material-icons enter-icon mr-2" id="adminIcon">
          perm_identity
        </i>
        <b>Admin Page</b>
      </h1>
      <div className="logoutBtn">
        <Link to="/">
          <button id="adminLogoutBtn">Logout</button>
        </Link>
      </div>
      <AdminTabs />
      <div id="adminFooter">&nbsp;</div>
    </div>
  );
};

export default Admin;
