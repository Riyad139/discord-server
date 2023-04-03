import { Socket } from "socket.io";
import room from "../../Models/Room";
import userStore, { getSocketInstance } from "../../store/store";
import updateRoom from "../update/updateRoom";

const createRoom = async (socket: Socket, payload: any) => {
  try {
    const userId = userStore._parseUserId(socket.handshake.auth.token);

    const roomRes = await room.create({
      name: payload.name,
      creator: userId,
      invitedUser: [userId, ...payload.invited],
    });

    roomRes.invitedUser.map(async (id) => {
      updateRoom(null, id);
    });
  } catch (error: any) {
    console.log(error);
  }
};

export default createRoom;
