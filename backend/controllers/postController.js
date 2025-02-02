import { v2 as cloudinary } from 'cloudinary'

import dotenv from 'dotenv';
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

dotenv.config();

const getPost = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);
        const query = {};

        const cat = req.query.cat;
        
        const author = req.query.author;
        const searchQuery = req.query.search;
        
        const sortQuery = req.query.sort;
        const featured = req.query.featured;

        if (cat) query.category = { $regex: cat, $options: "i" };;

        if (searchQuery) query.title = { $regex: searchQuery, $options: "i" };

        if (author) {
            const user = await userModel.findOne({ username: author }).select("_id");
            if (!user) {
                return res.status(404).json({ message: "No posts found for this author" });
            }
            query.user = user._id;
        }

        let sortObj = { createdAt: -1 };
        if (sortQuery) {
            switch (sortQuery) {
                case "newest":
                    sortObj = { createdAt: -1 };
                    break;
                case "oldest":
                    sortObj = { createdAt: 1 };
                    break;
                case "popular":
                    sortObj = { visit: -1 };
                    break;
                case "trending":
                    sortObj = { visit: -1 };
                    query.createdAt = {
                        $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
                    };
                    break;
                default:
                    console.warn(`Unrecognized sortQuery: ${sortQuery}`);
                    break;
            }
        }

        if (featured) query.isFeatured = true;

        const posts = await postModel
            .find(query)
            .populate("user", "username")
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(sortObj);

        const totalPosts = await postModel.countDocuments(query);
        const hasMore = page * limit < totalPosts;

        res.status(200).json({ posts, hasMore, totalPosts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const slugPost = async (req, res) => {
    try {
        const slugPost = await postModel.findOne({ slug: req.params.slug }).populate("user", "username image");
        if (!slugPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        console.log(slugPost)

        res.status(200).json(slugPost);
    } catch (error) {
        console.error('Error fetching slug post:', error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        // Ensure authentication
        const clerkUserId = req.auth.userId;
        if (!clerkUserId) {
            return res.status(401).json({ message: "Not Authenticated" });
        }

        // Find user
        const user = await userModel.findOne({ clerkUserId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let slug = req.body.title.replace(/ /g, "-").toLowerCase();
        let existingPost = await postModel.findOne({ slug });
        let counter = 2;
        while (existingPost) {
            slug = `${slug}-${counter}`
            existingPost = await postModel.findOne({ slug });
            counter++;
        }

        // Validate request body
        if (!req.body.title || !req.body.category || !req.body.content) {
            return res.status(400).json({ message: "Missing required fields: title, category, content" });
        }

        // Create and save the post
        const newPost = new postModel({ user: user._id, slug, ...req.body });
        const post = await newPost.save();

        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


const deletePost = async (req, res) => {
    try {
        // Ensure authentication
        const clerkUserId = req.auth?.userId;
        if (!clerkUserId) {
            return res.status(401).json({ message: "Not Authenticated" });
        }

        const role = req.auth.sessionClaims?.metadata?.role || "user";

        if (role === 'admin') {
            await postModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: "Post is deleted" });
        }

        // Find user
        const user = await userModel.findOne({ clerkUserId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete post
        const deletedPost = await postModel.findOneAndDelete({
            _id: req.params.id,
            user: user._id,
        });

        if (!deletedPost) {
            return res.status(404).json({ message: "You can delete only your post" });
        }

        res.status(200).json({ message: "Post is deleted" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const featurePost = async (req, res) => {
    try {
        // Ensure authentication
        const clerkUserId = req.auth?.userId;
        const postId = req.body.postId;

        

        // Check if user is authenticated
        if (!clerkUserId) {
            return res.status(401).json({ message: "Not Authenticated" });
        }

        // Ensure user has the correct role
        // const role = req.auth.sessionClaims?.metadata?.role;
        const role = req.auth.sessionClaims?.metadata?.role || 'admin';
        
        if (role !== 'admin') {
            return res.status(403).json({ message: "You cannot feature this post" });
        }

       
        

        // Fetch the post by ID
        const post = await postModel.findById(postId);
        

        // If post is not found
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Toggle the `isFeatured` property
        const isFeatured = post.isFeatured;
        

        // Update the post's `isFeatured` status
        const updatedPost = await postModel.findByIdAndUpdate(
            postId,
            { isFeatured: !isFeatured },
            { new: true } // Return the updated document
        );

        // If for some reason the update did not work
        if (!updatedPost) {
            return res.status(500).json({ message: "Failed to update post" });
        }

        

        // Return the updated post
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error featuring post:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const uploadAuth = async (req, res) => {
    try {
        const imageFile = req.file; // Multer processes the uploaded file
        if (!imageFile) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
            folder: "blog-website",
        });

        console.log("Image Upload: ",imageUpload);

        const imageURL = imageUpload.secure_url;
        const results = await postModel.findByIdAndUpdate(req.query._id, {
            image: imageUpload.secure_url
        });
        console.log("req object: ", req.query, req.params, req.body);
        // Return the uploaded image URL
        return res.status(200).json({ success: true, url: imageURL });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};








export { getPost, slugPost,uploadAuth, createPost, deletePost, featurePost }; 