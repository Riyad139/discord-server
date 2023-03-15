import { RequestHandler } from "express";

declare global {
  interface Controller extends RequestHandler {}
}
