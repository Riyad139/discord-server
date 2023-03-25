import express from "express";
import {
  acceptFriendRequest,
  addFriend,
  rejectFriendRequest,
} from "../Controller/firendController";
const router = express.Router();

router.route("/friend/addFriend").post(addFriend);
router.route("/friend/reject").post(rejectFriendRequest);
router.route("/friend/accept").post(acceptFriendRequest);

export default router;
