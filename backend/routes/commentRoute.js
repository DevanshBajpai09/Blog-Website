import express from "express"
import { addComment, deleteComment, getPostComments } from "../controllers/commentController.js"

const commentRouter = express.Router()

commentRouter.get("/:postId", getPostComments)
commentRouter.post("/:postId", addComment)
commentRouter.delete("/:id", deleteComment)

export default commentRouter 