//Axios
const axios = require("axios");

module.exports = {
  //func logs
  logConnectToApp: function(username, room) {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    //Event Log
    axios.post(
      "http://localhost:5000/event/create-event",
      {
        user: username,
        room: room,
        type: "socket",
        description: "connected to Chat App",
        date: dateStringify
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  },
  logDisconnectToApp: function(username, room) {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    //Event Log
    axios.post(
      "http://localhost:5000/event/create-event",
      {
        user: username,
        room: room,
        type: "socket",
        description: "disconnected from Chat App",
        date: dateStringify
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  },

  logLeftRoom: function(username, room) {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    //Event Log
    axios.post(
      "http://localhost:5000/event/create-event",
      {
        user: username,
        room: room,
        type: "socket",
        description: "Left a room",
        date: dateStringify
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  },
  logJoinRoom: function(username, room) {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    //Event Log
    axios.post(
      "http://localhost:5000/event/create-event",
      {
        user: username,
        room: room,
        type: "socket",
        description: "Joined a room",
        date: dateStringify
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  },
  logMessageSent: function(username, room, message) {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    //Event Log
    axios.post(
      "http://localhost:5000/message/create-message",
      {
        sender: username,
        room: room,
        message: message,
        type: "message",
        date: dateStringify
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
