import userModel from "../models/userModel.js";

// Get user saved posts
export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth?.userId;

  if (!clerkUserId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const user = await userModel.findOne({ clerkUserId }).populate("savedPosts");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedPosts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch saved posts", error });
  }
};

// Save or unsave a post
export const savePost = async (req, res) => {
  const clerkUserId = req.auth?.userId;
  const { postId } = req.body;

  if (!clerkUserId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const user = await userModel.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = user.savedPosts.includes(postId);

    if (isSaved) {
      user.savedPosts = user.savedPosts.filter((id) => id !== postId);
    } else {
      user.savedPosts.push(postId);
    }

    await user.save();

    res.status(200).json({ message: isSaved ? "Post unsaved" : "Post saved" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update saved posts", error });
  }
};
