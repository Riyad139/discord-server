import { Socket } from "socket.io";
import room from "../../Models/Room";
import { getSocketInstance } from "../../store/store";
import updateActiveRoom from "../update/updateActiveRoom";

const joinRoomHandler = async (payload: { id: string }, socket: Socket) => {
  await room.findOneAndUpdate(
    { _id: payload.id },
    {
      $push: { joinedSocketId: socket.id },
    }
  );
  const roomRes = await room.findById(payload.id);

  await updateActiveRoom(roomRes);
};

export default joinRoomHandler;
