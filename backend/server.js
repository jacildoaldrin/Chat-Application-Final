const express = require("express");
const socketio = require("socket.io");

const port = process.env.PORT || 5000;

const app = express();
const server = app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

const io = socketio(server);

// database
const connect = require("./database/db");


// routes
const messageRoute = require("./routes/message-route");
const logRoute = require("./routes/log-route");

app.use("/message", messageRoute);
app.use("/log", logRoute);

const users = {};

io.on("connection", socket => {
  require("./socket/socket")(socket, io, users, connect);
});
