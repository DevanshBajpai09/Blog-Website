import React from 'react'
import { Link } from 'react-router-dom'
import MainCategory from '../Component/MainCategory'
import FeaturePost from '../Component/FeaturePost'
import PostList from '../Component/PostList'

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { MoveRight } from 'lucide-react'
import { BoxReveal } from "@/components/ui/box-reveal";
import { BlurFade } from '../components/ui/blur-fade';


const HomePage = () => {
    
    return (
        <>
         <BlurFade delay={0.40} inView>

        <div className='mt-4 flex flex-col gap-4'>
            <div className='gap-4'>
            <AnimatedShinyText className="inline-flex  items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-300 hover:duration-300 hover:dark:text-neutral-400 border rounded-full">
          <span>✨ Blog And Article</span>
          <MoveRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
         
        </AnimatedShinyText>
                
               
            </div>
            <div className='flex items-center justify-between'>
                <div className=''>
                <BoxReveal boxColor={"tranparent"} duration={0.8}>
                    <h1 className='text-white text-lg md:text-3xl lg:text-3xl font-bold'><span className='text-5xl'>Welcome </span>to our blog, where creativity, stories, and inspiration collide!</h1>
                    </BoxReveal>
                    <p className='mt-8 text-md md:text-xl'>A Place to Share Thoughts, Stories, and Creative Ideas Daily</p>
                </div>
                <Link to="write" className="hidden md:block relative">
                    <svg
                        viewBox="0 0 200 200"
                        width="200"
                        height="200"
                        className="text-lg tracking-widest animate-spin animatedButton"
                        // className="text-lg tracking-widest"
                    >
                        <path
                            id="circlePath"
                            fill="none"
                            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                            />
                        <text>
                            <textPath href="#circlePath" startOffset="0%">
                                Write your story •
                            </textPath>
                            <textPath href="#circlePath" startOffset="50%">
                                Share your idea •
                            </textPath>
                        </text>
                    </svg>
                    <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="50"
                            height="50"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                        >
                            <line x1="6" y1="18" x2="18" y2="6" />
                            <polyline points="9 6 18 6 18 15" />
                        </svg>
                    </button>
                </Link>
            </div>

            <MainCategory/>
            <FeaturePost/>


            <div>
            <AnimatedShinyText className="mb-10 inline-flex  items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-300 hover:duration-300 hover:dark:text-neutral-400 border rounded-full">
          <span>Recent Post</span>
          <MoveRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
         
        </AnimatedShinyText>
                <PostList/>
            </div>

        </div>
                            </BlurFade>
                           </>
    )
}

export default HomePage