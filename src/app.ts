import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./Routes/authRoute";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.HOST, credentials: true }));
app.use(authRoute);

mongoose.connect(process.env.DB_URL as string).then(() => {
  console.log("database is connected");
});

export default app;
