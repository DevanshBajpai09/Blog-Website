import express from "express";
import connectDB from "./lib/connectDB.js";

import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import dotenv from 'dotenv'
import webhookRouter from "./routes/webhookRoute.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";
import connectCloudinary from "./lib/cloudianry.js";

dotenv.config()

const app = express();


app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(3001, () => {
  connectDB();
  connectCloudinary()

  console.log("Server is running!");
});
