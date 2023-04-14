import { Socket } from "socket.io";

const peerSignalHandler = (data: any, socket: Socket) => {
  const { connUserSoc, signal } = data;
  const signalData = { signal, connUserSoc: socket.id };
  socket.to(connUserSoc).emit("conn-signal", signalData);
};

export default peerSignalHandler;
