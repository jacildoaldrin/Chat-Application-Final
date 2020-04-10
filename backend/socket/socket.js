//Logs
const logs = require("../functions/logs");

const users = [];

const joinMessages = [
  `just joined the room - glhf!`,
  "just joined. Everyone, look busy!",
  "just joined. Can I get a heal?",
  "just landed.",
  "just joined. Hide your bananas.",
  "has spawned in the room.",
  "just slid into the room.",
  "has arrived. Party's over.",
];

module.exports = (io) => {
  io.on("connection", (socket) => {
    users.push({id: socket.id, username: "", room: null});

    socket.on("new-user", (data, callback) => {
      let userExist = users.find(
        (user) => user.username.toLowerCase() === data.username.toLowerCase()
      );

      if (userExist) {
        return callback({ error: "Username taken!!" });
      }

      //remove preset user created on connection
      let index = users.findIndex(user => user.id === socket.id);
      users.splice(index, 1)[0];

      let user = {
        id: socket.id,
        username: data.username,
        room: data.room
      }

      users.push(user);

      // join room
      socket.join(user.room);

      // creating log
      logs.logConnectToApp(user.username, user.room);

      // emitting to room that user joined
      io.to(user.room).emit("chat-message", {
        username: "System",
        message: `${user.username} ${
          joinMessages[Math.floor(Math.random() * joinMessages.length)]
        }`,
        user: user.username,
        roomname: user.room,
      });

      callback();
    });

    socket.on("join-room", (room) => {
      // find existing user
      let user = users.find(user => user.id === socket.id);
      user.room = room;

      // log event
      logs.logJoinRoom(user.username, user.room);

      // join room
      socket.join(user.room);

      // tells everyone in the room user joined
      io.to(user.room).emit("chat-message", {
        username: "System",
        message: `${user.username} ${
          joinMessages[Math.floor(Math.random() * joinMessages.length)]
        }`,
        user: user.username,
        roomname: user.room,
      });

      io.to(user.room).emit("new-room", user.room);
    });

    socket.on("leave-room", () => {
      // find existing user
      let user = users.find(user => user.id === socket.id);

      // log event
      logs.logLeftRoom(user.username, user.room);

      // leave room
      socket.leave(user.room);

      // tells everyone on the room that user left
      io.to(user.room).emit("chat-message", {
        username: "System",
        message: `${user.username} has left the room.`,
        user: user.username,
      });
    });

    socket.on("disconnect", () => {
      // find existing user's index
      let index = users.findIndex(user => user.id === socket.id);

      // find existing user
      let user = users[index];
      
      if (user.room != null) {
        logs.logDisconnectToApp(
          user.username,
          user.room
        );
        io.to(user.room).emit("chat-message", {
          username: "System",
          message: `${user.username} has disconnected.`,
        });
      }
      //removes user from the list of users
      users.splice(index, 1)[0];
    });

    socket.on("send-message", (message) => {
      // find existing user
      let user = users.find(user => user.id === socket.id);

      // emit to room user joined
      io.to(user.room).emit("chat-message", {
        username: user.username,
        message: message,
      });

      // log event
      logs.logMessageSent(
        user.username,
        user.room,
        message
      );
    });
  });
};
