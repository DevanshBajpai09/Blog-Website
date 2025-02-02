import React, { useState } from 'react';
import SingleComment from './SingleComment';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import InputEmoji from "react-input-emoji";

const fetchComments = async (postId) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
  return res.data;
};

const Comments = ({ postId }) => {
  const { user } = useUser();
  const [Text, setText] = useState(''); // State to hold InputEmoji value
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { isLoading, data, error } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setText(''); // Clear the text field after successful submission
    },
    onError: (error) => {
      console.error(error.response?.data || "Error occurred");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Text.trim()) return; // Prevent empty submissions
    mutation.mutate({ desc: Text });
  };

  return (
    <div className='flex flex-col gap-8 lg:w-3/5'>
      <h1 className='text-xl text-black underline'>Comments</h1>
      <form onSubmit={handleSubmit} className='flex items-center justify-between gap-8 w-full'>
        <div className="w-full mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
          <div className="px-4 border-white bg-white rounded-t-lg">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <InputEmoji
              value={Text}
              onChange={setText}
              cleanOnEnter
              onEnter={(value) => setText(value)}
              placeholder="Write your comment here..."
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              disabled={Text.trim().length < 1}
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-900 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg"
            >
              Post comment
            </button>
          </div>
        </div>
      </form>
      {isLoading ? `${<div>
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>

        </div>
      </div>}` : error ? `${<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Error Loading Comment </span>
</div>
}` :
        <>
          {mutation.isLoading && (
            <SingleComment comment={{
              desc: `${Text} (sending...)`,
              createdAt: new Date(),
              user: {
                image: user.imageUrl,
                username: user.username,
              },
            }} />
          )}
          {Array.isArray(data) && data.map((comment) => (
            <SingleComment key={comment._id} comment={comment} postId={postId} />
          ))}

        </>
      }
    </div>
  );
};

export default Comments;
