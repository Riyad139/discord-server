import { Socket } from "socket.io";
import room from "../../Models/Room";
import userStore, { getSocketInstance } from "../../store/store";

export default async function updateRoom(
  socket: Socket | null,
  id: string | null
) {
  let userId;
  if (socket) userId = userStore._parseUserId(socket.handshake.auth.token);

  const io = getSocketInstance();
  let socketIds;
  if (id) socketIds = userStore.getSocketListByUserId(id);
  else socketIds = userStore.getSocketListByUserId(userId);
  const targetId = id || userId;
  const roomlist = await room.find({ invitedUser: { $in: [targetId] } });
  socketIds.forEach((sc) => {
    io.to(sc).emit("room-list", roomlist);
  });
}
