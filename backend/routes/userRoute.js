import express from 'express'
import { getUserSavedPosts, savePost } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/saved", getUserSavedPosts)
userRouter.patch("/save", savePost)

export default userRouter 