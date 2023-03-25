import Invitation from "../../Models/Invitation";
import User from "../../Models/User";
import userStore, { getSocketInstance } from "../../store/store";

const updatePendingUser = async (userId: string) => {
  const targetUser = await User.findOne({ _id: userId });
  if (!targetUser) return "error";
  const pendingInvitation = await Invitation.find({
    Receiver: targetUser._id,
  }).populate("Sender", "_id username email");
  //if (pendingInvitation.length < 1) return "error";

  const getUserConnectedIds = userStore.getSocketListByUserId(
    targetUser._id.toString()
  );
  const io = getSocketInstance();

  if (getUserConnectedIds) {
    getUserConnectedIds.forEach((socketIds) => {
      io.to(socketIds).emit("friend-request", {
        pendingRequest: pendingInvitation,
      });
    });
  }
};
export default updatePendingUser;
