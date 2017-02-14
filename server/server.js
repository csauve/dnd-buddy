const express = require("express");
const serveStatic = require("serve-static");
const config = require("config");
const socketIo = require("socket.io");
const http = require("http");
const uuid = require("uuid");
const Roll = require("roll");
const Canvas = require("canvas");

const roll = new Roll();
const canvas = new Canvas(config.canvas.width, config.canvas.height);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#e5ffc4";
ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);

const getCanvasData = function() {
  return canvas.toDataURL();
};

const setCanvasData = function(canvasData) {
  const img = new Canvas.Image();
  img.src = canvasData;
  ctx.drawImage(img, 0, 0, config.canvas.width, config.canvas.height);
};

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use("/", serveStatic(config.server.staticDir, {index: ["index.html"]}));

io.on("connection", function(socket) {
  console.log("Client socket connected");
  socket.emit("canvasDataMsg", {
    userName: null,
    canvasData: getCanvasData()
  });

  socket.on("canvasDataMsg", function(canvasDataMsg) {
    console.log("Broadcasting canvas data received from " + canvasDataMsg.userName);
    socket.broadcast.emit("canvasDataMsg", canvasDataMsg);
    setCanvasData(canvasDataMsg.canvasData);
  });

  socket.on("roll", function(rollReq) {
    if (!roll.validate(rollReq.roll)) return;
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

console.log("HTTP server listening on port " + config.server.port);
server.listen(config.server.port);
