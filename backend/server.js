const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
const server = app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

// socket
const io = require('socket.io')(server);
require('./socket/socket')(io);

// ssl error fix
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// body-parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// for cors error
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

