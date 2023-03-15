import express from "express";
import { loginUser, registerUser } from "../Controller/userController";

const authRoute = express.Router();

authRoute.route("/user/signup").post(registerUser);
authRoute.route("/user/login").post(loginUser);

export default authRoute;
