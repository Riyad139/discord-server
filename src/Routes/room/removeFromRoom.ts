import { Socket } from "socket.io";
import room from "../../Models/Room";
import updateActiveRoom from "../update/updateActiveRoom";

const removeFromRoom = async (socket: Socket) => {
  const roomRes = await room.findOneAndUpdate(
    { joinedSocketId: { $in: socket.id } },
    { $pull: { joinedSocketId: socket.id } }
  );
  const updatedRes = await room.findById(roomRes?._id);

  updatedRes?.joinedSocketId.forEach((id: string) => {
    socket.to(id).emit("remove-peer-connection", { connUserSoc: socket.id });
  });

  await updateActiveRoom(updatedRes);
};
export default removeFromRoom;
