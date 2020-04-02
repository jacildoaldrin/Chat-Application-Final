const express = require("express");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

//Logs
const logs = require("./functions/logs");

const app = express();
const server = app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

const io = socketio(server);

//SSL ERROR FIX
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

//body-parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// CORS
app.use(cors());

// routes
const messageRoute = require("./routes/message-route");
const eventRoute = require("./routes/event-route");
const userRoute = require("./routes/user-route");
const roomRoute = require("./routes/room-route");

app.use("/message", messageRoute);
app.use("/event", eventRoute);
app.use("/user", userRoute);
app.use("/room", roomRoute);

const users = {};

io.on("connection", socket => {
  users[socket.id] = { username: null, room: null };

  socket.on("new-user", data => {
    users[socket.id].username = data.username;
    users[socket.id].room = data.room;

    socket.join(users[socket.id].room);
    // logs.logConnectToApp(users[socket.id].username, users[socket.id].room);
    io.to(users[socket.id].room).emit("chat-message", {
      username: "System",
      message: `${users[socket.id].username} joined the room !`,
      user: users[socket.id].username
    });
  });

  socket.on("join-room", room => {
    // logs.logJoinRoom(users[socket.id].username, users[socket.id].room);
    users[socket.id].room = room;
    socket.join(room);

    io.to(room).emit("chat-message", {
      username: "System",
      message: `${users[socket.id].username} has joined the room!`,
      user: users[socket.id].username
    });

    io.to(users[socket.id].room).emit("new-room", users[socket.id].room);
  });

  socket.on("leave-room", room => {
    // logs.logLeftRoom(users[socket.id].username, users[socket.id].room);
    socket.leave(room);
    io.to(room).emit("chat-message", {
      username: "System",
      message: `${users[socket.id].username} has left the room!`,
      user: users[socket.id].username
    });
  });

  socket.on("disconnect", () => {
    if (users[socket.id].room != null) {
      // logs.logDisconnectToApp(users[socket.id].username, users[socket.id].room);
      io.to(users[socket.id].room).emit("chat-message", {
        username: "System",
        message: `${users[socket.id].username} has disconnected.`
      });
    } else {
      delete users[socket.id];
    }
    delete users[socket.id];
  });

  socket.on("send-message", message => {
    const username = users[socket.id].username;
    io.to(users[socket.id].room).emit("chat-message", {
      username: username,
      message: message
    });
    // logs.logMessageSent(
    //   users[socket.id].username,
    //   users[socket.id].room,
    //   message
    // );
  });
});
