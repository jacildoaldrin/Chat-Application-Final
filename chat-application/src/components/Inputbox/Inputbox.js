import React from "react";

const Inputbox = ({message, sendMessage, setMessage, userTyping}) => {
  
  return (
    <div>
      <form onSubmit={event => !message ? event.preventDefault(): sendMessage(event)}>
        <input
          type="text"
          value={message}
          onChange={event => {setMessage(event.target.value); userTyping(event)}}
        />
        <button type="submit">Send</button>
      </form>
      <br />
    </div>
  );
};

export default Inputbox;
