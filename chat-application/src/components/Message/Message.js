import React from "react";
import "./Message.css";

const Message = props => {
  let currentUser = props.message.username === props.username;
  return currentUser ? (
      <div className="messageContainer justifyEnd">
        <strong className="sentText pr-10">You</strong>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{props.message.message}</p>
        </div>
      </div>
  ) : (
    <div>
      <div className="username-received">
        <strong>{props.message.username}</strong>
      </div>
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">
            {props.message.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
