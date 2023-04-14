import { Socket } from "socket.io";

const InitialPeerConnectionHandler = (socket: Socket, data: any) => {
  const { connectedUserSocketId } = data;
  socket
    .to(connectedUserSocketId)
    .emit("conn-init", { connectedUserSocketId: socket.id });
};

export default InitialPeerConnectionHandler;
