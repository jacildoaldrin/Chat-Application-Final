import React from "react";
import "./Message.css";

const Message = props => {
  let currentUser = props.message.username === props.username;

  let content;

  switch (props.message.username) {
    case props.username:
      content = (
        <div>
          <strong className="userMessage colorDark">You</strong>
          <div className="messageContainer justifyEnd">
            <div className="messageBox-sender backgroundBlue">
              <p className="messageText colorWhite">{props.message.message}</p>
            </div>
          </div>
        </div>
      );
      break;

    case "System":
      content = (
        <div className="systemMessage">
          <p className="messageText colorDark">{props.message.message}</p>
        </div>
      );
      break;

    default:
      content = (
        <div>
          <strong className="chatMessage colorDark">
            {props.message.username}
          </strong>
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{props.message.message}</p>
            </div>
          </div>
        </div>
      );
  }

  return content;
};

export default Message;
