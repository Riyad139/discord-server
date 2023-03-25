import { Socket } from "socket.io";
import User from "../../Models/User";
import userStore, { getSocketInstance } from "../../store/store";

const updateFriendList = async (userId: string) => {
  try {
    const user = await User.findById(userId, {
      _id: 1,
      friends: 1,
    }).populate("friends", "_id username email");
    const friendList = user?.friends;
    if (!user) return;
    const getSocketIds = userStore.getSocketListByUserId(
      userId.toString() as string
    );

    const io = getSocketInstance();

    getSocketIds.forEach((socketId) => {
      io.to(socketId).emit("friend-list", {
        payload: friendList ? friendList : [],
      });
    });
  } catch (error: any) {
    console.log(error);
  }
};

export default updateFriendList;
