import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import { Webhook } from "svix";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    return res.status(400).json({
      message: "Webhook verification failed!",
    });
  }

  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      image: evt.data.image_url,
    });

    try {
      await newUser.save();
      console.log("New user saved:", newUser);
    } catch (error) {
      console.error("Error saving user:", error.message);
    }
  }

  if (evt.type === "user.deleted") {
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: evt.data.id,
    });

    if (!deletedUser) {
      console.log("User not found for deletion:", evt.data.id);
      return res.status(404).json({
        message: "User not found",
      });
    }

    try {
      await Post.deleteMany({ user: deletedUser._id });
      await Comment.deleteMany({ user: deletedUser._id });
      console.log("Deleted posts and comments for user:", deletedUser._id);
    } catch (error) {
      console.error("Error deleting posts or comments:", error.message);
    }
  }

  return res.status(200).json({
    message: "Webhook received",
  });
};
