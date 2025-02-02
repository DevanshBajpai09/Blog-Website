import React, { useState } from 'react'

import { Menu, Text } from 'lucide-react'
import { Link } from 'react-router-dom'

import { SignedIn, SignedOut,  UserButton } from "@clerk/clerk-react";
import logo from '../assets/Images/logo.png';




const Navbar = () => {
    
       
      

    const [open, setopen] = useState(false)
  return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between'>
        <Link to="/" className='flex items-center gap-4 text-2xl font-bold'>
            <img  src={logo}  className='w-8 h-8' alt="lOGO" />
            <span>bigBlog</span>
        </Link>

        <div className='md:hidden'>
            <div className='cursor-pointer text-4xl' onClick={()=>setopen((prev)=>!prev)}>
                {open ? <Menu /> : <Text />}
            </div>
            <div className={`w-full h-screen flex flex-col gap-8 font-medium text-lg items-center justify-center absolute top-16  transition-all ease-in-out ${open ? "-right-0" : "-right-[100%]"}`}>
            <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to='/theme'>Theme</Link>
                <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login</button>

            </div>
        </div>
        <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
        <Link to="/">Home</Link>
                
                <Link to="/about">About</Link>
                <Link to='/theme'>Theme</Link>
            <SignedOut>
                <Link to='/login'>
            <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login</button>
                </Link>
        
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
            
        </div>
    </div>
  )
}

export default Navbar