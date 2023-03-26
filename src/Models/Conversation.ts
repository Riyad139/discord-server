import mongoose, { Schema, Document } from "mongoose";

interface IConversation {
  perticipant?: string[];
  conversation?: string[];
}

export interface IConversationDoc extends IConversation, Document {}

const ConversationSchema = new mongoose.Schema({
  perticipant: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  conversation: [
    {
      type: Schema.Types.ObjectId,
      ref: "Messages",
    },
  ],
});

const Conversation = mongoose.model<IConversationDoc>(
  "Conversations",
  ConversationSchema
);

export default Conversation;
