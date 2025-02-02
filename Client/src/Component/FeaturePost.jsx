import React from 'react';

import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { format } from 'timeago.js'; // Ensure you're using a date formatting library like `date-fns`
import { Star } from 'lucide-react';
import { BlurFade } from '../components/ui/blur-fade';
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { MoveRight } from 'lucide-react'

const fetchFeaturedPosts = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return response.data;
};

const FeaturePost = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchFeaturedPosts()
  });

  if (isLoading) return <div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>

  </div>;
  if (error) return <div>Something went wrong: {error.message}</div>;

  const posts = data.posts;

  if (!posts || posts.length === 0) {
    return <div>No featured posts found.</div>;
  }


  return (
    <>
      <div>
        <AnimatedShinyText className="inline-flex mt-5   items-center px-4 py-1 transition ease-out hover:text-neutral-300 hover:duration-300 hover:dark:text-neutral-400 border rounded-full">

          <span>Feature Post</span>
          <MoveRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />

        </AnimatedShinyText>
      </div>
      <BlurFade delay={0.30} inView>

        <div className="mt-5 flex flex-col lg:flex-row gap-8">

          {/* First Post */}
          <div className="w-full  lg:w-1/2 flex flex-col gap-4">
            {posts[0]?.image && (
              <img
                src={posts[0].image}
                className="rounded-3xl shadow-xl  object-cover w-[895px] transition-transform duration-400 ease-in-out hover:scale-95"

              />
            )}
            <div className="flex items-center gap-4">
              <h1 className="font-semibold lg:text-lg">01</h1>
              <Link className="text-blue-600 lg:text-lg">{posts[0]?.category}</Link>
              <span className="text-gray-500">{format(new Date(posts[0]?.createdAt), 'PPP')}</span>
              {posts[0]?.isFeatured && <Star width={20} height={20} color='gold' fill='gold' />}
            </div>
            <Link to={posts[0]?.slug} className="text-xl lg:text-3xl font-semibold lg:font-bold">
              {posts[0]?.title}
            </Link>

          </div>



          {/* Remaining Posts */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {posts.slice(1).map((post, index) => (
              <div key={post._id} className="lg:h-1/3 flex justify-between gap-4">
                {post?.image && (
                  <div className="w-1/3 aspect-video transition-transform duration-400 ease-in-out hover:scale-95">
                    <img
                      src={post.image}
                      className="rounded-3xl shadow-xl object-cover w-full h-full transition-transform duration-400 ease-in-out hover:scale-95"

                    />

                  </div>
                )}
                <div className="w-2/3">
                  <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                    <h1 className="font-semibold">0{index + 2}.</h1>
                    <Link className="text-blue-800">{post?.category}</Link>
                    <span className="text-gray-500 text-sm">
                      {format(new Date(post?.createdAt), 'PPP')}
                    </span>
                  </div>
                  <Link
                    to={post?.slug}
                    className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
                  >
                    {post?.title}
                  </Link>
                  {post?.isFeatured && <Star width={20} height={20} className='mt-1' color='gold' fill='gold' />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>
    </>
  );
};

export default FeaturePost;
