import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

import { BlurFade } from '../components/ui/blur-fade';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from 'lucide-react';
// import { Skeleton } from "@/components/ui/skeleton"
// import Skeleton from 'react-loading-skeleton'


const PostListItem = ({ post , isFeatured}) => {
//  const [isLoading, setisLoaing] = useState(true)




  return (
    <>
    
    {/* <Skeleton> */}
    
      <BlurFade delay={0.20} inView>
        <Card className='mt-10 border shadow-xl rounded-xl mb-10'>
          <div className="flex xl:flex-row">
            <div className="relative  rounded-l-xl overflow-hidden md:hidden xl:block xl:w-1/3">
              <img
                src={post.image}
                alt='Post Thumbnail'
                className="w-full h-full object-cover transition-transform duration-400 ease-in-out hover:scale-95"
              />
            </div>
            <div className="flex flex-col gap-4 xl:w-2/3">
              <CardHeader>
                <CardTitle>
                  <Link to={`/${post.slug || 'default-slug'}`} className="text-4xl font-semibold ">
                    {post.title || 'Untitled'}
                  </Link>
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>Written By</span>
                    <Link to={`/posts?author=${post.user.username}`} className="text-blue-800">
                      <Badge>{post.user.username || 'Unknown Author'}</Badge>
                    </Link>
                    <span>On</span>
                    <Link to="/" className="text-blue-800">
                      <Badge variant="outline" className='text-blue-500'>{post.category || 'Uncategorized'}</Badge>
                    </Link>
                    <span>{format(post.createdAt || new Date())}</span>
                    {post?.isFeatured && <Star width={20} height={20}  color='gold' fill='gold'/> }
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="relative group">
  <p>
    {post.desc || 'No description available.'}
    <span className="absolute bottom-6 left-6 w-0  h-1 bg-purple-700 group-hover:w-96  transition-all duration-300 inline-block"></span>
  </p>
</CardContent>
              <CardFooter>
                <Link to={`/${post.slug || 'default-slug'}`} className="text-blue-600 underline text-sm">
                  Read More
                </Link>
              </CardFooter>
            </div>
          </div>
        </Card>
      </BlurFade>
      {/* </Skeleton>  */}
    </>
  );
};

export default PostListItem;
