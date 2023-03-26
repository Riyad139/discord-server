import Conversation from "../Models/Conversation";
import Messages from "../Models/Messages";
import updateMessages from "../Routes/update/updateMessages";

export const DirectConversation: Controller = async (req, res, next) => {
  try {
    const { reciverId, content } = req.body;
    const senderId = req.user._id;

    const message = await Messages.create({
      author: senderId,
      content: content,
      Date: new Date(),
      type: "DIRECT",
    });

    const check = await Conversation.findOne({
      perticipant: { $all: [reciverId, senderId] },
    });

    if (check && check.conversation) {
      check.conversation.push(message._id);
      await check.save();
    } else {
      await Conversation.create({
        perticipant: [senderId, reciverId],
        conversation: [message._id],
      });
    }
    console.log(1);

    await updateMessages(check?._id.toString(), null);

    res.status(201).send("Success");
  } catch (error: any) {
    res.status(500).send("something went wrong");
  }
};

export const chatHistory: Controller = async (req, res, next) => {
  try {
    const senderId = req.user._id;
    const { reciverId } = req.body;
    const conv = await Conversation.findOne({
      perticipant: { $all: [senderId, reciverId] },
    });
    await updateMessages(conv?._id.toString(), senderId.toString());
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
