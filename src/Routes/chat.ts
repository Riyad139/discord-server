import express from "express";
import {
  chatHistory,
  DirectConversation,
} from "../Controller/conversationController";
const router = express.Router();

router.route("/chat/sendMesssage").post(DirectConversation);
router.route("/chat/chat-history").post(chatHistory);

export default router;
