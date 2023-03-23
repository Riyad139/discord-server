import express from "express";
import { logedInUser, loginUser, registerUser } from "../Controller/userController";

const authRoute = express.Router();

authRoute.route("/user/signup").post(registerUser);
authRoute.route("/user/login").post(loginUser).get(logedInUser);

export default authRoute;
