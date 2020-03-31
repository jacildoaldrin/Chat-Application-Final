import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";

const Chatbox = props => {
    return (
    <>
      <ScrollToBottom>
        {props.messages.map((message, index) => (
          <div key={index}>
            <div>
              <Message message={message} username={props.username} />
            </div>
          </div>
        ))}
      </ScrollToBottom>
    </>
  );
};

export default Chatbox;
