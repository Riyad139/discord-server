import app from "./app";
import http from "http";
import { Server, Socket } from "socket.io";
import parseUser from "./store/parseUser";
import { NextFunction } from "express";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  //console.log(socket.handshake.auth.token);
  parseUser(socket);
});

server.listen(process.env.PORT, () =>
  console.log(`server is listening on port ${process.env.PORT}`)
);

export default server;
