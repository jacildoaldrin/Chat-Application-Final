import React from "react";

const Chatinfo = props => {
  return (
    <div className="infoBar">
      <div className="leftChatContainer">
        <h3>
          <strong className="mr-2">Username:</strong> {props.username}
        </h3>
      </div>
      <div className="leftChatContainer">
        <h3>
          <strong className="mr-2">Room:</strong> {props.room}
        </h3>
      </div>
    </div>
  );
};

export default Chatinfo;
