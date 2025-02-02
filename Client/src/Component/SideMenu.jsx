import React from 'react'
import SearchComponent from './SearchComponent'
import { Link } from 'react-router-dom'
import {  useSearchParams } from "react-router-dom";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

const SideMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleFilterChange = (e) => {
      if (searchParams.get("sort") !== e.target.value) {
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          sort: e.target.value,
        });
      }
    };
  
    const handleCategoryChange = (category) => {
      if (searchParams.get("cat") !== category) {
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          cat:category,
        });
      }
    };
    console.log(handleCategoryChange)
  return (
    <div className='px-4 h-max sticky top-8'>
        <AnimatedShinyText className="inline-flex  text-sm font-medium mt-4 mb-3 px-1  transition text-neutral-50 ease-out hover:text-neutral-300 hover:duration-300 hover:dark:text-neutral-600">
                        
                            <span>Search</span>
                            
                           
                          </AnimatedShinyText>
        <SearchComponent/>
        <AnimatedShinyText className="inline-flex  text-sm font-medium mt-4 mb-3 px-1  transition text-neutral-50 ease-out hover:text-neutral-300 hover:duration-300 hover:dark:text-neutral-600">
                        
                            <span>Filter</span>
                            
                           
                          </AnimatedShinyText>
        <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] border-white cursor-pointer rounded-full bg-white checked:bg-black"
          />
          Newest
        </label>
        
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] border-white cursor-pointer rounded-full bg-white checked:bg-black"/>
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] border-white cursor-pointer rounded-full bg-white checked:bg-black"/>
          Oldest
        </label>
      </div>
      <AnimatedShinyText className="inline-flex  text-sm font-medium mt-4 mb-3 px-1  transition text-neutral-50 ease-out hover:text-neutral-300 hover:duration-300 hover:dark:text-neutral-600">
            
                <span>Category</span>
                
               
              </AnimatedShinyText>
      <div className='flex flex-col gap-2 text-sm'>
                 
                    <a onClick={()=>handleCategoryChange("")} className="cursor-pointer flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      
                      <span className="text-sm font-medium text-gray-900 dark:text-white">All</span>
                    </a>
                    <a onClick={()=>handleCategoryChange("General")} className="cursor-pointer flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      
                      <span className="text-sm font-medium text-gray-900 dark:text-white">General</span>
                    </a>
                  
                  <a className="flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      
                    <span onClick={()=>handleCategoryChange("web Design")} className="text-sm font-medium text-gray-900 dark:text-white">Web Design</span>
                  </a>
                  <a onClick={()=>handleCategoryChange("Development")} className="flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      
                    <span  className="text-sm  font-medium text-gray-900 dark:text-white">Development</span>
                  </a>
                   <a onClick={()=>handleCategoryChange("Database")} className="flex items-center cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      
                    <span  className="text-sm font-medium text-gray-900 dark:text-white">Data Base</span>
                  </a>
                   <a onClick={()=>handleCategoryChange("Engines")} className="flex items-center cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      
                    <span  className="text-sm font-medium text-gray-900 dark:text-white">Search Engine</span>
                  </a>
                   <a onClick={()=>handleCategoryChange("Marketing")} className="mb-5 flex items-center cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      
                    <span  className="text-sm font-medium text-gray-900 dark:text-white">Marketing</span>
                  </a>
                </div>
      
    </div>
  )
}

export default SideMenu