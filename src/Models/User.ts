import mongoose, { Document } from "mongoose";

export interface IUser {
  username?: string;
  email?: string;
  password?: string;
}

export interface IUserDoc extends IUser, Document {}

const userModel = new mongoose.Schema({
  username: [String],
  email: [String],
  password: [String],
});

const User = mongoose.model<IUserDoc>("users", userModel);

export default User;
