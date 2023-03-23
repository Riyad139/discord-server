import { Socket } from "socket.io";
import * as jwt from "jsonwebtoken";
class userStore {
  private onlineUser = new Map();
  private _parseUserId(token: string) {
    const id = jwt.verify(token, process.env.TOKEN_SECRETKEY as string);
    //@ts-ignore
    return id.id;
  }
  addUserToOnline(socket: Socket) {
    const id = this._parseUserId(socket.handshake.auth.token);
    this.onlineUser.set(id, socket.id);
    console.log(this.onlineUser);
  }
  removeUserFromOnline(socket: Socket) {
    const id = this._parseUserId(socket.handshake.auth.token);
    this.onlineUser.delete(id);
    console.log(this.onlineUser);
  }
}

const user = new userStore();

export default user;
