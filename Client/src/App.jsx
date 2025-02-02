import './App.css'

import { Outlet, Route, Routes } from 'react-router-dom'
import HomePage from './Page/HomePage'
import PostListPage from './Page/PostListPage'
import Write from './Page/Write'
import LoginPage from './Page/LoginPage'
import RegisterPage from './Page/RegisterPage'
import MainLayout from './Layout/MainLayout'
import SinglePostPage from './Page/SinglePostPage'
import { Toaster } from 'react-hot-toast';
import useThemeContext from './Context/useThemeContext'
import Theme from './Page/Theme'
import About from './Component/About'



function App() {
  const {theme} = useThemeContext()
 


  return (
    <>
      <div data-theme={theme} className='px-4 md:px-8 lg:px-32 2xl:px-64'>
      <Toaster/>
        <MainLayout/>
        <Outlet/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/posts' element={<PostListPage/>} />
          <Route path='/:slug' element={<SinglePostPage/>} />
          <Route path='/write' element={<Write/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/theme' element={<Theme/>} />
          <Route path='/about' element={<About/>} />
        </Routes>
      
      </div>


    </>
  )
}

export default App
