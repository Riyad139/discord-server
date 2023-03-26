import mongoose, { Document, Schema } from "mongoose";

interface IMessages {
  author: Schema.Types.ObjectId;
  content: string;
  Date: Date;
  type: String;
}

export interface IMessagesDoc extends IMessages, Document {}

const MessagesSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  content: { type: String },
  Date: { type: Date },
  type: String,
});

const Messages = mongoose.model<IMessagesDoc>("Messages", MessagesSchema);

export default Messages;
