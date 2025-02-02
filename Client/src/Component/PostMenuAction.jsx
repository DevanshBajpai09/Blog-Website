import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { Bookmark, Star, Trash2 } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { MoveRight } from 'lucide-react'

const PostMenuAction = ({ post }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data: savedPostsResponse } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Ensure this is an array of saved post IDs
    },
  });

  const savedPosts = Array.isArray(savedPostsResponse) ? savedPostsResponse : [];
  
  
  const isAdmin =  user?.publicMetadata.role === 'admin' || false;
  const isSaved = isAdmin ||  savedPosts.some((savedPostId) => savedPostId === post._id);
  // console.log(isAdmin)

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries(["posts"]);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data || "Error deleting post");
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Post saved successfully");
      queryClient.invalidateQueries(["savedPosts"]);
      queryClient.invalidateQueries(["adminPosts"]); // Invalidate admin data
    },
    onError: (error) => {
      toast.error(error.response?.data || "Error saving post");
      // toast.error("Post unsaved successfully");
    },
  });
  console.log(saveMutation)

  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Post updated as featured");
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["adminPosts"]);
    },
    onError: (error) => {
      toast.error(error.response?.data || "Error featuring post");
    },
  });

  const handleSave = () => {
    if (!user) {
      return navigate("/Login");
    }
    console.log("Saving post..."); // Add this line to check if this is being triggered

  if (isAdmin || !isSaved) { // Check if admin or the post is not saved
    console.log("Admin saving post or post is not saved");
    saveMutation.mutate(); // Trigger mutation
  }

  };

  const handleFeature = () => {
    featureMutation.mutate();
  };

  return (
    <div>
      <AnimatedShinyText className="inline-flex text-sm font-medium mt-4 mb-3 px-1 transition text-neutral-50 ease-out hover:text-neutral-300 hover:duration-300 hover:dark:text-neutral-600">
        <span>Actions</span>
      </AnimatedShinyText>

      {isLoading ? (
        <div role="status">
          <span>Loading...</span>
        </div>
      ) : error ?  (
        "Saved Posts fetching failed"
      ) :  (
        <div
          onClick={handleSave}
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
        >
          <Bookmark
            fill={isSaved ? "black" : "none"}
            color="currentColor"
          />
          
        

          <span>{isSaved  ? "Saved" : "Save this post"}</span>
          {saveMutation.isLoading && <span className="text-sm">In progress</span>}
        </div>
      )}

      {isAdmin && (
        <div
          onClick={handleFeature}
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
        >
          <Star fill={post.isFeatured ? "black" : "none"} color="currentColor" />
          <span>{post.isFeatured ? "Unfeature this post" : "Feature this post"}</span>
          {featureMutation.isLoading && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}

      {post?.isFeatured && (
        <div className="flex items-center gap-2 py-2 text-sm">
          <Star fill="gold" color="gold" />
          <span>Featured Post</span>
        </div>
      )}

      {user && (post.user.username === user.username || isAdmin) && (
        <div
          onClick={() => deleteMutation.mutate()}
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
        >
          <Trash2 color="red" />
          <span className="text-red-400">Delete this post</span>
          {deleteMutation.isLoading && <span className="text-sm">In progress</span>}
        </div>
      )}
    </div>
  );
};

export default PostMenuAction;



