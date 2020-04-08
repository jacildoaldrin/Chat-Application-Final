// database
const connect = require("../database/db");
const mongoose = require("mongoose");

//models
const Event = require("../models/Event");
const Message = require("../models/Message");

module.exports = {
  //func logs
  logConnectToApp: function (username, room) {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    //Event Log
    connect
      .then((db) => {
        let event = new Event({
          _id: new mongoose.Types.ObjectId(),
          user: username,
          room: room,
          type: "CONNECT",
          description: "connected to chat app",
          date: dateStringify,
        });
        event.save();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  logDisconnectToApp: function (username, room) {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();
    //Event Log
    connect
      .then((db) => {
        let event = new Event({
          _id: new mongoose.Types.ObjectId(),
          user: username,
          room: room,
          type: "DISCONNECT",
          description: "disconnected from chat app",
          date: dateStringify,
        });
        event.save();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  logLeftRoom: function (username, room) {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();
    //Event Log
    connect
      .then((db) => {
        let event = new Event({
          _id: new mongoose.Types.ObjectId(),
          user: username,
          room: room,
          type: "LEAVE",
          description: "left a room",
          date: dateStringify,
        });
        event.save();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  logJoinRoom: function (username, room) {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();
    //Event Log
    connect
      .then((db) => {
        let event = new Event({
          _id: new mongoose.Types.ObjectId(),
          user: username,
          room: room,
          type: "JOIN",
          description: "joined a room",
          date: dateStringify,
        });
        event.save();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  logMessageSent: function (username, room, message) {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();
    //Event Log
    connect
      .then((db) => {
        let messageLog = new Message({
          _id: new mongoose.Types.ObjectId(),
          sender: username,
          room: room,
          message: message,
          type: "MESSAGE",
          date: dateStringify,
        });
        messageLog.save();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
