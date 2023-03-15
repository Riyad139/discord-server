import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL as string).then(() => {
  console.log("database is connected");
});

export default app;
