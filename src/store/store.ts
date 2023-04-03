import { Server, Socket } from "socket.io";
import * as jwt from "jsonwebtoken";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import updatePendingUser from "../Routes/update/friendPendinghandler";
import updateFriendList from "../Routes/update/updateFriendList";
class CuserStore {
  private onlineUser = new Map();
  private trackOfOnlineUser = new Map();
  _parseUserId(token: string) {
    const id = jwt.verify(token, process.env.TOKEN_SECRETKEY as string);
    //@ts-ignore
    return id.id;
  }
  addUserToOnline(socket: Socket) {
    const id = this._parseUserId(socket.handshake.auth.token);
    this.onlineUser.set(socket.id, id);
    this.trackOfOnlineUser.set(id, socket.id);
    updatePendingUser(id).then((vl) => {});
    updateFriendList(id).then((vl) => {});
  }
  removeUserFromOnline(socket: Socket) {
    const userId = this.onlineUser.get(socket.id);
    this.onlineUser.delete(socket.id);
    this.trackOfOnlineUser.delete(userId);
  }
  getSocketListByUserId(userId: string) {
    let socketList: string[] = [];
    this.onlineUser.forEach((value, key) => {
      if (value === userId) socketList.push(key);
    });
    return socketList;
  }
  getOnlineUser(userList: string[]) {
    const online: string[] = [];
    userList.forEach((id) => {
      if (this.trackOfOnlineUser.has(id)) online.push(id);
    });
    return online;
  }
  getUserIdBySockId(socketIds: string[] | null | undefined) {
    const set = new Set();
    socketIds?.map((id) => {
      if (this.onlineUser.has(id)) set.add(this.onlineUser.get(id));
    });
    return Array.from(set);
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
