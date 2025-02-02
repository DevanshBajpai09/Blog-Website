import express from "express";
import { clerkWebHook } from "../controllers/webhookController.js";
import bodyParser from "body-parser";

const webhookRouter = express.Router();

webhookRouter.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  clerkWebHook
);

export default webhookRouter;
