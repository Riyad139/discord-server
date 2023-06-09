import { Socket } from "socket.io";
import * as jwt from "jsonwebtoken";

const parseUser = async (socket: Socket) => {
  try {
    const token = socket.handshake.auth.token;
    const verified = jwt.verify(token, process.env.TOKEN_SECRETKEY as string);
    //@ts-ignore
    const userId = verified.id;
  } catch (error: any) {
    const SocketError = new Error("User not found");
    console.log(SocketError);
  }
};
export default parseUser;
