const socket = io();

const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("message-form");
const userInput = document.getElementById("input");
const formContainer = document.getElementById('form-container');
const submitButton = document.getElementById('send-button');

formContainer.style.display = "none";

const appendMessage = (message, background = "white", text = "black") => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.style.backgroundColor = background;
  messageContainer.append(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
};

const name = prompt("Enter Name");
socket.emit("new-user", name);
let room;

socket.on("user-connected", data => {
  data.name == name ? appendMessage(`You have joined ${data.room}`) : appendMessage(`${data.name} joined the room`);
});

socket.on("user-disconnected", data => {
  appendMessage(`${data.name} has disconnected from ${data.room}`);
});

socket.on("chat-message", data => {
  data.name == name ? appendMessage(`You: ${data.message}`, "lightblue", "white") : appendMessage(`${data.name}: ${data.message}`);
});

messageForm.addEventListener("submit", event => {
  // prevents page from refreshing when executes event
  event.preventDefault();
  const message = userInput.value;
  socket.emit("send-message", message);
  userInput.value = "";
});

const room1 = () => {
  style();

  // Leaves previous room if it exists
  if (room != null) {
    socket.emit("leave-room", room);
  }
  room = "room1";
  socket.emit("join-room", room);
  appendMessage("You have connected to room1");
};

const room2 = () => {
  style();
  // Leaves previous room if it exists
  if (room != null) {
    socket.emit("leave-room", room);
  }
  room = "room2";
  socket.emit("join-room", room);
  appendMessage("You have connected to room2");
};

const style = () => {
  messageContainer.innerHTML = "";
  formContainer.style.display = "block";
  formContainer.style.margin = "auto";

  messageContainer.style.display = "block";
  messageContainer.style.margin = "auto";
  messageContainer.style.border = "1px solid black";
}