import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./Routes/authRoute";
import friendRoute from "./Routes/friendRoute";
import cors from "cors";
import addUserToReg from "./MiddleWare/addUserToReg";
dotenv.config();

const app = express();
app.use(cors({ origin: process.env.HOST, credentials: true }));
app.use(express.json());
app.use(authRoute);

app.use(addUserToReg);
app.use(friendRoute);

mongoose.connect(process.env.DB_URL as string).then(() => {
  console.log("database is connected");
});

export default app;
