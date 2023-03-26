import Conversation from "../../Models/Conversation";
import userStore, { getSocketInstance } from "../../store/store";

const updateMessages = async (convId: string, specificId: string | null) => {
  try {
    const conversation = await Conversation.findById(convId).populate({
      path: "conversation",
      model: "Messages",
      populate: {
        path: "author",
        model: "Users",
        select: "_id username",
      },
    });

     if (conversation && conversation.perticipant) {
      const io = getSocketInstance();

      if (specificId) {
        const socketIds = userStore.getSocketListByUserId(
          specificId.toString()
        );
        return socketIds.filter((id) => {
          io.to(id).emit("chat-history", { conversation });
        });
      }

      conversation.perticipant.map((userId) => {
        const socketIds = userStore.getSocketListByUserId(userId.toString());
        socketIds.filter((id) => {
          io.to(id).emit("direct-message", { conversation });
        });
      });
    }
  } catch (error: any) {
    console.log(error);
  }
};

export default updateMessages;
