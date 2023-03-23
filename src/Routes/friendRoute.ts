import express from "express";
import { addFriend } from "../Controller/firendController";
const route = express.Router();

route.route("/friend/addFriend").post(addFriend);

export default route;
