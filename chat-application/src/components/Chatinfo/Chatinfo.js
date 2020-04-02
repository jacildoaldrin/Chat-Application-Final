import React from "react";

const Chatinfo = props => {
  return (
    <div className="infoBar">
      <div className="leftChatContainer">
        <h3>
          <strong>Welcome {props.username} !!</strong> 
        </h3>
      </div>
    </div>
  );
};

export default Chatinfo;
