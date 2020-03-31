import React from "react";

const Inputbox = ({message, sendMessage, setMessage}) => {
  return (
    <div>
      <form onSubmit={event => sendMessage(event)}>
        <input
          type="text"
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <br />
    </div>
  );
};

export default Inputbox;
