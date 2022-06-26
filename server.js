const PORT = process.env.PORT || 3000;
const INDEX = "/public/index.html";

const express = require("express");
const socket = require("socket.io");

const app = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", (socket) => {
  io.sockets.emit("chat", {
    sender: "Server",
    message: socket.handshake.query["sender"] + " Hoş Geldiniz.",
  });
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
