import app from "./app";
import http from "http";
import { Server, Socket } from "socket.io";
import parseUser from "./store/parseUser";
import userStore, { setIoInstance } from "./store/store";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

setIoInstance(io);

io.on("connection", (socket: Socket) => {
  userStore.addUserToOnline(socket);
  socket.on("disconnect", () => {
    userStore.removeUserFromOnline(socket);
  });
});

server.listen(process.env.PORT, () =>
  console.log(`server is listening on port ${process.env.PORT}`)
);

export default server;
