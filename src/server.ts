import app from "./app";
import http from "http";
import { Server, Socket } from "socket.io";
import userStore, { setIoInstance } from "./store/store";
import updateOnlineUserList from "./Routes/update/udpdateOnlineUser";
import createRoom from "./Routes/room/createRoom";
import updateRoom from "./Routes/update/updateRoom";
import addUserToSocket from "./MiddleWare/addUserToSocket";
import joinRoomHandler from "./Routes/room/joinRoom";
import removeFromRoom from "./Routes/room/removeFromRoom";
import InitialPeerConnectionHandler from "./Routes/room/InitialPeerConnectionHandler";
import peerSignalHandler from "./Routes/room/peerSignalHandler";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_CORS as string,
    methods: ["GET", "POST"],
  },
});

io.use(addUserToSocket);

setIoInstance(io);

export const emitOnlineUser = (socket: Socket) => {
  const id = userStore._parseUserId(socket.handshake.auth.token);
  updateOnlineUserList(id);
};

io.on("connection", (socket: Socket) => {
  let InterValid: NodeJS.Timer | null = null;
  /////////////////////////// on connect add user to online and update online list
  userStore.addUserToOnline(socket);
  emitOnlineUser(socket);
  /////// on  disconnect event remove user from the  online list ///////
  socket.on("disconnect", () => {
    if (InterValid) {
      clearInterval(InterValid);
    }
    userStore.removeUserFromOnline(socket);
    removeFromRoom(socket);
  });
  /////////////////////////////// on  create room event ///////////////
  socket.on("create-room", (payload) => {
    createRoom(socket, payload);
  });

  ////////updating room on user connect /////////////
  updateRoom(socket, null);

  ///////////// on room join event///////////////
  socket.on("join-room", (payload) => {
    joinRoomHandler(payload, socket);
  });
  ////// leaving room ////////////////////////////
  socket.on("leave-room", () => removeFromRoom(socket));
  ///// conn-init ///////////////////////////////
  socket.on("conn-init", (data) => InitialPeerConnectionHandler(socket, data));
  /////// conn-signal /////////////////////////
  socket.on("conn-signal", (data) => {
    peerSignalHandler(data, socket);
  });
  ///////////////// update online list after every 30 seconds
  InterValid = setInterval(() => emitOnlineUser(socket), 30 * 1000);
});

server.listen(process.env.PORT, () =>
  console.log(`server is listening on port ${process.env.PORT}`)
);

export default server;
