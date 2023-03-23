import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  _id?: any;
  username?: string;
  email?: string;
  password?: string;
  friends: { userId: string; ref: string }[];
}

export interface IUserDoc extends IUser, Document {}

const userModel = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  friends: [{ type: String, ref: "Users" }],
});

const User = mongoose.model<IUserDoc>("Users", userModel);

export default User;
