const mongoose = require("mongoose");

// models
const Message = require("../models/Message");
const Log = require("../models/Log");

module.exports = (socket, io, users, connect) => {
  socket.on("new-user", name => {
    users[socket.id] = { name: name, room: null };

    // save event to database
    // connect
    //   .then(db => {
    //     let log = new Log({
    //       _id: new mongoose.Types.ObjectId(),
    //       username: name,
    //       room: users[socket.id].room,
    //       event: `user connected`,
    //       timestamp: new Date()
    //     });
    //     log.save();
    //   })
    //   .catch(err => console.log(err));
  });

  socket.on("join-room", room => {
    users[socket.id].room = room;
    socket
      .to(room)
      .emit("user-connected", users[socket.id])
      .then(() => {
        socket.join(room);
      });

    // save event to database
    // connect
    //   .then(db => {
    //     let log = new Log({
    //       _id: new mongoose.Types.ObjectId(),
    //       username: users[socket.id].name,
    //       room: users[socket.id].room,
    //       event: `user joined room`,
    //       timestamp: new Date()
    //     });
    //     log.save();
    //   })
    //   .then(() => {
    //     socket.join(room);
    //   })
    //   .catch(err => console.log(err));
  });

  socket.on("leave-room", room => {
    socket
      .to(room)
      .emit("user-disconnected", users[socket.id])
      .then(() => {
        socket.leave(room);
      });
    //save event to database
    // connect
    //   .then(db => {
    //     let log = new Log({
    //       _id: new mongoose.Types.ObjectId(),
    //       username: users[socket.id].name,
    //       room: users[socket.id].room,
    //       event: `user left the room`,
    //       timestamp: new Date()
    //     });
    //     log.save();
    //   })
    //   .then(() => {
    //     socket.leave(room);
    //   })
    //   .catch(err => console.log(err));
  });

  socket.on("disconnect", () => {
    if (users[socket.id].room != null) {
      socket
        .to(users[socket.id].room)
        .emit("user-disconnected", users[socket.id])
        .then(() => {
          delete users[socket.id];
        });
    }

    // save event to database
    // connect
    //   .then(db => {
    //     let log = new Log({
    //       _id: new mongoose.Types.ObjectId(),
    //       username: users[socket.id].name,
    //       room: users[socket.id].room,
    //       event: `user disconnected`,
    //       timestamp: new Date()
    //     });
    //     log.save();
    //   })
    //   .then(() => {
    //     delete users[socket.id];
    //   })
    //   .catch(err => console.log(err));
  });

  socket.on("send-message", message => {
    io.to(users[socket.id].room).emit("chat-message", {
      name: users[socket.id].name,
      message: message
    });

    // save event to database
    // connect
    //   .then(db => {
    //     let chatMessage = new Message({
    //       _id: new mongoose.Types.ObjectId(),
    //       sender: users[socket.id].name,
    //       message: message,
    //       room: users[socket.id].room,
    //       timestamp: new Date()
    //     });
    //     chatMessage.save();
    //   })
    //   .catch(err => console.log(err));
  });
};
