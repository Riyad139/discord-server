import { Server, Socket } from "socket.io";
import * as jwt from "jsonwebtoken";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import updatePendingUser from "../Routes/update/friendPendinghandler";
class CuserStore {
  private onlineUser = new Map();
  private _parseUserId(token: string) {
    const id = jwt.verify(token, process.env.TOKEN_SECRETKEY as string);
    //@ts-ignore
    return id.id;
  }
  addUserToOnline(socket: Socket) {
    const id = this._parseUserId(socket.handshake.auth.token);
    this.onlineUser.set(socket.id, id);
    updatePendingUser(id).then((vl) => {});
  }
  removeUserFromOnline(socket: Socket) {
    this.onlineUser.delete(socket.id);
  }
  getSocketListByUserId(userId: string) {
    let socketList: string[] = [];
    this.onlineUser.forEach((value, key) => {
      if (value === userId) socketList.push(key);
    });
    return socketList;
  }
}
let io: any;

export const setIoInstance = (
  socketInstance: Server<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  >
) => {
  io = socketInstance;
};

export const getSocketInstance = () => {
  return io;
};

const userStore = new CuserStore();

export default userStore;
