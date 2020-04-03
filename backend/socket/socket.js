//Logs
const logs = require('../functions/logs');

const users = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    users[socket.id] = { username: null, room: null };

    socket.on("new-user", (data) => {
      users[socket.id].username = data.username;
      users[socket.id].room = data.room;

      socket.join(users[socket.id].room);
      // logs.logConnectToApp(users[socket.id].username, users[socket.id].room);
      io.to(users[socket.id].room).emit("chat-message", {
        username: "System",
        message: `${users[socket.id].username} joined the room !`,
        user: users[socket.id].username,
        roomname: users[socket.id].room,
      });
    });

    socket.on("join-room", (room) => {
      // logs.logJoinRoom(users[socket.id].username, users[socket.id].room);
      users[socket.id].room = room;
      socket.join(room);

      io.to(room).emit("chat-message", {
        username: "System",
        message: `${users[socket.id].username} has joined the room!`,
        user: users[socket.id].username,
        roomname: users[socket.id].room,
      });

      io.to(users[socket.id].room).emit("new-room", users[socket.id].room);
    });

    socket.on("leave-room", (room) => {
      // logs.logLeftRoom(users[socket.id].username, users[socket.id].room);
      socket.leave(room);
      io.to(room).emit("chat-message", {
        username: "System",
        message: `${users[socket.id].username} has left the room!`,
        user: users[socket.id].username,
      });
    });

    socket.on("disconnect", () => {
      if (users[socket.id].room != null) {
        // logs.logDisconnectToApp(users[socket.id].username, users[socket.id].room);
        io.to(users[socket.id].room).emit("chat-message", {
          username: "System",
          message: `${users[socket.id].username} has disconnected.`,
        });
      }
      delete users[socket.id];
    });

    socket.on("send-message", (message) => {
      const username = users[socket.id].username;
      io.to(users[socket.id].room).emit("chat-message", {
        username: username,
        message: message,
      });
      // logs.logMessageSent(
      //   users[socket.id].username,
      //   users[socket.id].room,
      //   message
      // );
    });
  });
};
