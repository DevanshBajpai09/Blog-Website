import React from 'react';
import PropTypes from 'prop-types';

import { format } from 'timeago.js';
import { useAuth, useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const SingleComment = ({ comment, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const role = user?.publicMetadata?.role;
  console.log('role',role)

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      console.log('token',token)
      return axios.delete(`${import.meta.env.VITE_API_URL}/comments/${comment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success('Comment deleted successfully');
    },
    onError: (error) => {
      console.error(error.response?.data || 'Error occurred');
      toast.error(error.response?.data?.message || 'Failed to delete comment');
    },
  });

  if (!comment) return null;
  console.log(comment);
  // Safety check to ensure comment exists

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {comment?.user?.image && (
          <Avatar>


            <AvatarImage src={comment.user.image} />

            <AvatarFallback>{(comment.user.username).slice(0, 2)}</AvatarFallback>
          </Avatar>

        )}
        <span className="font-medium">{comment?.user?.username || 'Anonymous'}</span>
        <span className="text-sm text-gray-300">{format(comment.createdAt)}</span>
        {user && (comment?.user?.username === user?.username || role === 'admin') && (
          <span
            onClick={() => mutation.mutate()}
            className="cursor-pointer underline text-red-600"
          >
            Delete
          </span>
        )}
        {mutation.isLoading && <span>(in progress)</span>}
      </div>
      <div className="mt-4">
        <p>{comment?.desc || 'No content available'}</p>
      </div>
    </div>
  );
};
SingleComment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      image: PropTypes.string,
      username: PropTypes.string,
    }),
    createdAt: PropTypes.string.isRequired,
    desc: PropTypes.string,
  }).isRequired,
  postId: PropTypes.string.isRequired,
};

export default SingleComment;

