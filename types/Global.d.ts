import { RequestHandler } from "express";
import { IUser } from "../src/Models/User";
import { Socket } from "socket.io";

declare global {
  interface Controller extends RequestHandler {}
  namespace Express {
    export interface Request {
      user: IUser;
    }
    export interface Socket {
      user: IUser;
    }
  }
}
