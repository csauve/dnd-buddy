const express = require("express");
const serveStatic = require("serve-static");
const config = require("config");
const socketIo = require("socket.io");
const http = require("http");
const uuid = require("uuid");
const Roll = require("roll");

const roll = new Roll();
const canvasData = {};

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use("/", serveStatic(config.server.staticDir, {index: ["index.html"]}));

io.on("connection", function(socket) {
  console.log("Client socket connected");

  socket.emit("canvasData", canvasData);

  socket.on("canvasUpdate", function(update) {
    io.emit("canvasUpdate", update);
  });

  socket.on("roll", function(rollReq) {
    io.emit("rollResult", {
      rollId: uuid.v4(),
      roll: rollReq.roll,
      result: roll.roll(rollReq.roll).result,
      userName: rollReq.userName
    });
  });

  socket.on("disconnect", function() {
    console.log("Client socket disconnected");
  });
});

console.log(`HTTP server listening on ${config.server.port}`);
server.listen(config.server.port);
