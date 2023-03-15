import express from "express";
import { getUser } from "../Controller/userController";

const authRoute = express.Router();

authRoute.route("/user").get(getUser);

export default authRoute;
