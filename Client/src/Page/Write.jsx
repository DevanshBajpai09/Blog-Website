import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useRef, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Button } from "@/components/ui/button"

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { MoveRight } from 'lucide-react'
import { BlurFade } from '../components/ui/blur-fade';




function Write() {
    const { isLoaded, isSignedIn } = useUser();
    const [image, setImage] = useState(null);
    const [value, setValue] = useState('');
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const quillRef = useRef();
    const [url, setUrl] = useState('');
    


    
   

    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken();
            return await axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
        },
        onSuccess: (res) => {
            toast.success('Post has been created');
            saveimg(res.data._id); // Pass the correct postId
            navigate(`/${res.data.slug}`);
        },
        onError: (err) => {
            toast.error('Error creating post: ' + err.message);
        },
    });

    if (!isLoaded) {
        return <div>Loading ......</div>;
    }

    if (isLoaded && !isSignedIn) {
        return (
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg dark:text-red-400 dark:border-red-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">SignIn</span> You Should SignIn.
                </div>
            </div>
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const data = {
            title: formData.get('title'),
            category: formData.get('category'),
            desc: formData.get('desc'),
            content: value, // Editor content
        };



        mutation.mutate(data);
    };

    const saveimg = async (postId) => {
        if (!image) {
            return toast.error("Please upload an image");
        }

        const formData = new FormData();
        formData.append("image", image); // Append the image file to FormData
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/posts/upload-auth?_id=${postId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Ensure the header for file uploads
                    },
                }
            );

            const cloudData = res.data;
            setUrl(cloudData.url); // Save the uploaded URL if needed
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Image upload failed");
        }
    };



    return (
        <>

            <BlurFade delay={0.30} inView>

                <div className="md:h-[calc(100vh-80px)] h-[calc(100vh-80px)] flex flex-col gap-6">
                    <AnimatedShinyText className="inline-flex  items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-300 hover:duration-300 hover:dark:text-neutral-400 border rounded-full">
                        <span>Create you own Post</span>
                        <MoveRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />

                    </AnimatedShinyText>
                    {/* Cover Image Upload */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
                        <label htmlFor="image">
                            <div className='inline-block relative cursor-pointer'>
                                {image
                                    ? <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : ""} alt="" />
                                    : <img className='w-10 absolute bottom-12 right-12' src={image ? '' : ''} alt="" />
                                }
                            </div>

                            <label className="block mb-2 text-sm font-medium  dark:text-white" htmlFor="image">Set a cover Image</label>
                            <input className="block w-[20] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id='image' onChange={(e) => setImage(e.target.files[0])} type="file" />





                        </label>

                        {/* Title Input */}
                        <input
                            type="text"
                            placeholder="Heading"
                            name="title"
                            className="text-4xl font-semibold bg-transparent outline-none"
                            required
                        />
                        <div className="flex items-center gap-4">
                            <label htmlFor="category" className="text-sm font-medium">
                                Choose a Category
                            </label>
                            <select
                                name="category"
                                id="category"
                                className="p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            >
                                <option value="General">General</option>
                                <option value="Web Design">Web Design</option>
                                <option value="Development">Development</option>
                                <option value="Database">Database</option>
                                <option value="Engines">Engines</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>



                        {/* Category Dropdown */}


                        {/* Short Summary */}
                        <textarea
                            name="desc"
                            placeholder="A short summary of your post"
                            className="p-4 shadow-md rounded-xl text-sm bg-white"
                            required
                        ></textarea>

                        {/* Upload and Quill Editor */}
                        <div className="flex flex-1">


                            <ReactQuill
                                ref={quillRef}
                                value={value}
                                onChange={setValue}
                                className="flex-1 p-2 rounded-xl bg-white shadow-md"
                                theme="snow"
                                placeholder='Write your post here...'
                            />
                        </div>

                        {/* Submit Button */}


                        <InteractiveHoverButton type="submit" className="bg-white text-black font-medium rounded-full mt-4 p-2 w-36 mb-3"
                            onClick={saveimg}>{mutation.isLoading ? 'Loading...' : 'Send'}</InteractiveHoverButton>

                        {/* Error Message */}
                        {mutation.isError && <span>{mutation.error.message}</span>}
                    </form>
                </div>
            </BlurFade>
        </>
    );
}

export default Write;