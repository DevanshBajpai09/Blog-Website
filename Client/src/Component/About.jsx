import React from 'react';
import About_img from '../assets/Images/fun-3d-cartoon-illustration-indian-businessman-removebg-preview.png';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button"
import {Linkedin, Twitter} from 'lucide-react'
import { BlurFade } from '../components/ui/blur-fade';

const About = () => {
  return (
    <>
    <BlurFade delay={0.30} inView>

    <section className="rounded-xl shadow-2xl mt-6 flex flex-col items-center bg-gray-100 py-12 px-4 md:px-16 lg:px-24">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">About</h1>

      {/* Content Container */}
      <div className="mt-10 flex flex-col lg:flex-row gap-12 items-center lg:items-start">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <img
            src={About_img}
            alt="About Us"
            className="w-[350px] bg-transparent h-[850px]  object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col gap-4 text-center lg:text-left max-w-xl">
          <Badge variant="outline" className="text-white bg-black  mx-auto md:w-32 lg:mx-0">
            Your Trusted Blog
          </Badge>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 leading-snug">
            Integrity is Coverage,
            <br />
            Flexibility in Writing
          </h2>
          <p className="text-black text-base md:text-lg leading-relaxed">
            Welcome to <span className="bg-slate-800  text-white">bigBlog</span>, your one-stop
            destination for insightful articles, creative ideas, and practical tips on topics that
            matter to you. Whether you're seeking inspiration, knowledge, or entertainment, our blog
            is here to spark curiosity and deliver value through engaging content.
            <br />
            <br />
            Our mission is to create a platform where readers can explore a diverse range of topics,
            from health and wellness to travel, technology, and lifestyle. We believe in the power
            of words to inform, inspire, and connect people across the globe.
            <br />
            <br />
            At <span className="bg-slate-800  text-white">bigBlog</span>, we value community and
            encourage interaction. Together, we can make this space a hub for learning and sharing
            ideas. Let’s explore, learn, and grow together—one post at a time!
          </p>
          <a href='https://www.linkedin.com/in/devansh-bajpai-875101248/' target='_blank' className='mx-auto'>
        <Button  variant="outline" className='mt-10 shadow-xl border-black text-black rounded-none  hover:bg-black hover:text-white'>GET IN TOUCH</Button>
          </a>

        </div>



      </div>
    </section>
            </BlurFade>
            </>
  );
};

export default About;
