import React, { useState } from 'react'
import PostList from '../Component/PostList'
import SideMenu from '../Component/SideMenu'

const PostListPage = () => {

  const [open, setopen] = useState(false)
  return (
    <div className=''>
      <h1 className='mb-8 text-2xl'>{}</h1>
      <button onClick={()=>setopen((prev)=>!prev)} className='bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden'>{open?'close':'filter or search'}</button>
      <div className='flex flex-col-reverse md:flex-row gap-8'>
        <div className=''>
          <PostList/>
        </div>
        <div className={`${open?"block":"hidden"} md:block`}>
          <SideMenu/>
        </div>
      </div>
    </div>
  )
}

export default PostListPage