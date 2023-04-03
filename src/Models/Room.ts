import mongoose, { Document } from "mongoose";

export interface IRoomModel {
  name: string;
  creator: string;
  invitedUser: string[];
  joinedSocketId: string[];
}

export interface IRoomDoc extends IRoomModel, Document {}

const roomModel = new mongoose.Schema({
  name: String,
  creator: { type: String, ref: "Users" },
  invitedUser: [{ type: String, ref: "Users" }],
  joinedSocketId: [String],
});

const room = mongoose.model<IRoomDoc>("Rooms", roomModel);

export default room;
