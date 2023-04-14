import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./Routes/authRoute";
import friendRoute from "./Routes/friendRoute";
import chatRoute from "./Routes/chat";
import cors from "cors";
import addUserToReg from "./MiddleWare/addUserToReg";
dotenv.config();

const app = express();
app.use(cors({ origin: process.env.HOST, credentials: true }));
app.use(express.json());
app.use("/api", authRoute);

app.use("/api", addUserToReg);
app.use("/api", friendRoute);
app.use("/api", chatRoute);

mongoose.connect(process.env.DB_URL as string).then(() => {
  console.log("database is connected");
});

export default app;
