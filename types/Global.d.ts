import { RequestHandler } from "express";
import { IUser } from "../src/Models/User";

declare global {
  interface Controller extends RequestHandler {}
  namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}
