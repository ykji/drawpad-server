const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const isDev = app.settings.env === "development";

const URL = isDev ? "http://localhost:3000" : "https://drawpad-lovat.vercel.app";

app.use(cors({ origin: URL }));

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: URL });

io.on("connection", (socket) => {
  console.log("server connected");

  socket.on("addPath", (arg) => {
    socket.broadcast.emit("addPath", arg);
  });

  socket.on("reset", (arg) => {
    socket.broadcast.emit("reset", arg);
  });

  socket.on("changeConfig", (arg) => {
    socket.broadcast.emit("changeConfig", arg);
  });
});

httpServer.listen(3030);
