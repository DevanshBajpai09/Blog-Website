import React from 'react';

import { Link, useParams } from 'react-router-dom';

import PostMenuAction from '../Component/PostMenuAction';

import Comments from '../Component/Comments';
import axios from 'axios';
import { useQuery } from 'react-query';
import { format } from 'timeago.js';
import DOMPurify from 'dompurify';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";



// Fetch post data by slug
const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};
console.log(fetchPost)

const SinglePostPage = () => {
  const { slug } = useParams();

  // Use React Query to fetch the post data
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['posts', slug],
    queryFn: () => fetchPost(slug),
  });
  console.log(data)


  // Handle loading state
  if (isLoading) return <div>
    <div role="status">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>

    </div>
  </div>;

  // Handle error state
  if (isError) return <p>Something went wrong: {error.message}</p>;

  // Handle if no data is returned
  if (!data) return <p>No post data available.</p>;



  const sanitizedDesc = DOMPurify.sanitize(data.desc);
  const sanitizedContent = DOMPurify.sanitize(data.content);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex gap-8'>
        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>
            {data.title}
          </h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Written by</span>

            <Badge className='bg-black text-white'>{data.user.username}</Badge>


            <span>On</span>
            <Badge className='text-blue-800 bg-transparent'>{data.category}</Badge>


            <span>{format(data.createdAt)}</span>
          </div>
          <p className='text-gray-500 font-medium' dangerouslySetInnerHTML={{ __html: sanitizedDesc }}></p>
        </div>


        <div className='hidden lg:block w-1/4'>
          <img src={data.image} className='rounded-2xl w-[550px] transition-transform duration-400 ease-in-out hover:scale-95c' />

        </div>

      </div>

      <div className='flex flex-col md:flex-row gap-12 mr-6 justify-between'>
        <div className='lg:text-lg flex flex-col gap-6 text-justify'>
          {/* Content section */}
          <p dangerouslySetInnerHTML={{ __html: sanitizedContent }}></p>
        </div>

        <div className='px-3 h-max sticky top-8'>
          <AnimatedShinyText className="inline-flex  text-sm font-medium mt-4 mb-3 px-1  transition text-neutral-50 ease-out hover:text-neutral-300 hover:duration-300 hover:dark:text-neutral-600">
                
                    <span>Author</span>
                    
                   
                  </AnimatedShinyText>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-8'>

              {data.user.image && (

                <Avatar>


                  <AvatarImage src={data.user.image} />

                  <AvatarFallback>{(data.user.username).slice(0, 2)}</AvatarFallback>
                </Avatar>
              )
              }


              <p className='-mx-4'>{(data.user.username).toUpperCase()}</p>
            </div>
            <p className='text-sm text-gray-500'>{data.desc}</p>
            
          </div>
          <PostMenuAction post={data} />
          <AnimatedShinyText className="inline-flex  text-sm font-medium mt-4 mb-3 px-1  transition text-neutral-50 ease-out hover:text-neutral-300 hover:duration-300 hover:dark:text-neutral-600">
                
                    <span>Category</span>
                    
                   
                  </AnimatedShinyText>
          <div className='flex flex-col gap-2 text-sm'>
            <Link to="/posts" className='cursor-pointer'>
              <a className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

                <span className="text-sm font-medium text-gray-900 dark:text-white">All</span>
              </a>
            </Link>
            <Link to="/posts?cat=General" className='cursor-pointer'>
              <a className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

                <span className="text-sm font-medium text-gray-900 dark:text-white">General</span>
              </a>
            </Link>
            <Link to="/posts?cat=Web Design" className='cursor-pointer'> <a className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

              <span className="text-sm font-medium text-gray-900 dark:text-white">Web Design</span>
            </a></Link>
            <Link to="/posts?cat=Development" className='cursor-pointer'> <a className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

              <span className="text-sm font-medium text-gray-900 dark:text-white">Development</span>
            </a></Link>
            <Link to="/posts?cat=Database" className='cursor-pointer'> <a className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

              <span className="text-sm font-medium text-gray-900 dark:text-white">Data Base</span>
            </a></Link>
            <Link to="/posts?cat=Engine" className='cursor-pointer'> <a className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

              <span className="text-sm font-medium text-gray-900 dark:text-white">Search Engine</span>
            </a></Link>
            <Link to="/posts?cat=Marketing" className='cursor-pointer'> <a className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

              <span className="text-sm font-medium text-gray-900 dark:text-white">Marketing</span>
            </a></Link>
          </div>

          
          
        </div>
      </div>

      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
