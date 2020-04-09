import React from "react";
import { Link } from "react-router-dom";
import "./Exit.css";

const Exit = () => {
  return (
    <div className="exit-container">
      <Link to={'/'}>
        <button className="exit-button">DISCONNECT</button>
      </Link>
    </div>
  );
};

export default Exit;
