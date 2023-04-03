import { Socket } from "socket.io";

const addUserToSocket = (socket: Socket, next: any) => {
  next();
};

export default addUserToSocket;
