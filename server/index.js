import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import { Connection } from "./database/db.js";
import Auth from "./routes/Auth.js";
import User from "./routes/User.js";
import Post from "./routes/Post.js";
import Upload from "./routes/Upload.js";
import Chat from "./routes/chat.js";
import Message from "./routes/Message.js";

const app = express();
dotenv.config();
const port = 8000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use("/story", express.static("story"));

// app.use("/images", express.static("images"));
// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;
await Connection();

app.use("/auth", Auth);
app.use("/user", User);
app.use("/post", Post);
app.use("/upload", Upload);
app.use("/chat", Chat);
app.use("/message", Message);

app.listen(port, () => console.log(`server is running on ${port}`));
