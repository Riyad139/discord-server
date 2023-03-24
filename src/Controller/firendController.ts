import Invitation from "../Models/Invitation";
import User from "../Models/User";
import updatePendingUser from "../Routes/update/friendPendinghandler";
import { getSocketInstance } from "../store/store";

export const addFriend: Controller = async (req, res, next) => {
  try {
    const targetEmail = req.body.targetEmail;
    if (
      !targetEmail ||
      (!targetEmail.includes("@") && !targetEmail.includes(".com"))
    ) {
      return res.status(400).send("Invalid email");
    }
    if (
      targetEmail?.toLocaleLowerCase() === req.user.email?.toLocaleLowerCase()
    )
      return res.status(409).send("you cannot add yourself");

    const targetUser = await User.findOne({ email: targetEmail });

    if (!targetUser) {
      return res.status(409).send("User not found");
    }
    const alreadySent = await Invitation.findOne({
      Sender: req.user._id,
      Receiver: targetUser._id,
    });

    if (alreadySent) {
      return res.status(409).send("already sent");
    }

    const userAlreadyFriend = targetUser.friends.find(
      (friendId) => friendId.toString() == req.user._id.toString()
    );

    if (userAlreadyFriend) {
      return res.status(400).send("User is already friend");
    }

    const resPonse = await Invitation.create({
      Sender: req.user._id,
      Receiver: targetUser._id,
    });

    await updatePendingUser(targetUser._id.toString());

    res.status(201).send(resPonse);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
