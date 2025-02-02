import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dock ,} from "@/components/ui/dock";

const MainCategory = () => {
    
    return (
        <>
        
            <Dock direction="middle" className='bg-white'>
        
            <div className=' flex-1  flex items-center justify-between flex-wrap'>

                <Link to="/posts" className='hover:bg-blue-800 text-gray-600 hover:text-white  rounded-full px-4 py-2'>All Post</Link>
                <Link to="/posts?cat=General" className='hover:bg-blue-800 text-gray-600 hover:text-white  rounded-full px-4 py-2'>General</Link>
                <Link to="/posts?cat=Web Design" className='hover:bg-blue-800 text-gray-600 hover:text-white  rounded-full px-4 py-2'>Web Design</Link>
                <Link to="/posts?cat=Development" className='hover:bg-blue-800 text-gray-600 hover:text-white  rounded-full px-4 py-2'>Development</Link>
                <Link to="/posts?cat=Database" className='hover:bg-blue-800 text-gray-600 hover:text-white  rounded-full px-4 py-2'>Database</Link>
                <Link to="/posts?cat=Engine" className='hover:bg-blue-800 text-gray-600 hover:text-white  rounded-full px-4 py-2'>Search Engine</Link>
                <Link to="/posts?cat=Marketing" className='hover:bg-blue-800 text-gray-600 hover:text-white  rounded-full px-4 py-2'>Marketing</Link>
            </div>
            
            

        
            </Dock>
        </>
    )
}

export default MainCategory