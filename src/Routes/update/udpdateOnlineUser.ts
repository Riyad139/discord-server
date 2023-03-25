import User from "../../Models/User";
import userStore, { getSocketInstance } from "../../store/store";
import * as jwt from "jsonwebtoken";
const updateOnlineUserList = async (userId: string) => {
  const user = await User.findById(userId);
  const userFriend = user?.friends;
  if (!userFriend) return [];
  const onlineUser = userStore.getOnlineUser(userFriend);
  const io = getSocketInstance();
  const socketIdsOfUser = userStore.getSocketListByUserId(userId);
  socketIdsOfUser.filter((ids) => {
    io.to(ids).emit("online-user", {
      payload: onlineUser ? onlineUser : [],
    });
  });
};

export default updateOnlineUserList;
