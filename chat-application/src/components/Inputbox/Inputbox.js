import React from "react";
import './Inputbox.css';

const Inputbox = ({ message, sendMessage, setMessage }) => {
  
  return (
      <form  id="form" onSubmit={event => !message ? event.preventDefault(): sendMessage(event)}>
        <input
          id="input"
          type="text"
          value={message}
          onChange={event => {setMessage(event.target.value);}}
          placeholder="Aa."
        />
        <button id="sendButton" type="submit"><i className="material-icons" id="send-icon">send</i></button>
      </form>
  );
};

export default Inputbox;
