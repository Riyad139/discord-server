import { IRoomDoc, IRoomModel } from "../../Models/Room";
import User from "../../Models/User";
import userStore, { getSocketInstance } from "../../store/store";

const userDetails = async (data: any) => {
  const userRes = await User.find({ _id: data });
  return userRes?.map((it) => {
    return {
      username: it?.username,
      email: it?.email,
    };
  });
};

const updateActiveRoom = async (room: IRoomDoc | null) => {
  const io = getSocketInstance();

  const ids = userStore.getUserIdBySockId(room?.joinedSocketId);

  const res = await userDetails(ids);

  room?.joinedSocketId.map((socId) => {
    io.to(socId).emit("active-room", { activeUser: res });
  });
};

export default updateActiveRoom;
