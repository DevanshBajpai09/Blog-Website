import express from "express";
import {
  getPost,
  slugPost,
  createPost,
  deletePost,
  
  featurePost,
  uploadAuth,
} from "../controllers/postController.js";
import increaseVisit from "../middlewares/increaseVisit.js";
import multer from "multer";
import upload from "../middlewares/multer.js";

const postRouter = express.Router();

postRouter.post("/upload-auth", upload.single('image') ,uploadAuth); // For file upload authorization
postRouter.get("/", getPost); // Fetch all posts
postRouter.get("/:slug", increaseVisit, slugPost); // Fetch single post by slug
postRouter.post("/", createPost); // Create a new post
postRouter.delete("/:id", deletePost); // Delete a post by ID
postRouter.patch("/feature", featurePost); // Feature/unfeature a post

export default postRouter;
