import app from "./app";
import http from "http";
import { Server, Socket } from "socket.io";
import parseUser from "./store/parseUser";
import userStore, { setIoInstance } from "./store/store";
import updateFriendList from "./Routes/update/updateFriendList";
import updateOnlineUserList from "./Routes/update/udpdateOnlineUser";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

setIoInstance(io);

export const emitOnlineUser = (socket: Socket) => {
  const id = userStore._parseUserId(socket.handshake.auth.token);
  updateOnlineUserList(id);
};

io.on("connection", (socket: Socket) => {
  userStore.addUserToOnline(socket);
  emitOnlineUser(socket);
  socket.on("disconnect", () => {
    userStore.removeUserFromOnline(socket);
  });
  setInterval(() => emitOnlineUser(socket), 30 * 1000);
});

server.listen(process.env.PORT, () =>
  console.log(`server is listening on port ${process.env.PORT}`)
);

export default server;
