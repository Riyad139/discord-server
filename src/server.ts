import app from "./app";
import http from "http";
import { Server, Socket } from "socket.io";
import parseUser from "./store/parseUser";
import userStore, { setIoInstance } from "./store/store";
import updateFriendList from "./Routes/update/updateFriendList";
import updateOnlineUserList from "./Routes/update/udpdateOnlineUser";
import createRoom from "./Routes/room/createRoom";
import updateRoom from "./Routes/update/updateRoom";
import addUserToSocket from "./MiddleWare/addUserToSocket";
import joinRoomHandler from "./Routes/room/joinRoom";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
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
  /////////////////////////// on connect add user to online and update online list
  userStore.addUserToOnline(socket);
  emitOnlineUser(socket);
  /////// on  disconnect event remove user from the  online list ///////
  socket.on("disconnect", () => {
    userStore.removeUserFromOnline(socket);
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

  ///////////////// update online list after every 30 seconds
  setInterval(() => emitOnlineUser(socket), 30 * 1000);
});

server.listen(process.env.PORT, () =>
  console.log(`server is listening on port ${process.env.PORT}`)
);

export default server;
