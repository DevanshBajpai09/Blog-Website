import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";


export const getPostComments = async (req, res) => {
  const comments = await commentModel.find({ post: req.params.postId })
    .populate("user", "username image")
    .sort({ createdAt: -1 });

  res.json(comments);
};

export const addComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.params.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await userModel.findOne({ clerkUserId });

  const newComment = new commentModel({
    ...req.body,
    user: user._id,
    post: postId,
  });

  const savedComment = await newComment.save();

  res.status(201).json(savedComment);
};

export const deleteComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const id = req.params.id;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth.sessionClaims?.metadata?.role || "admin";

  if (role === "admin") {
    await commentModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Comment has been deleted");
  }

  const user = userModel.findOne({ clerkUserId });

if (!user) {
  return res.status(401).json("User not found or not authenticated!");
}

const deletedComment = await commentModel.findOneAndDelete({
  _id: id,
  user: user._id,
});

if (!deletedComment) {
  return res.status(403).json("You can delete only your comment!");
}
};
