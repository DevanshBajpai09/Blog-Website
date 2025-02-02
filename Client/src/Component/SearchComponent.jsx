import React from 'react';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Handle key press to update the search query
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const query = e.target.value;
            if (location.pathname === "/posts") {
                // Update search params for the current page
                setSearchParams({ ...Object.fromEntries(searchParams), search: query });
            } else {
                // Navigate to posts page with search query
                navigate(`/posts?search=${query}`);
            }
        }
    };
    console.log(handleKeyPress)

    return (
        <form>
            <div className="relative p-1 w-40">
                <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    id="search"
                    onKeyDown={handleKeyPress}
                    className="block shadow-xl w-full p-2 ps-9 text-sm bg-gray-100 text-gray-900 border rounded-full"
                    placeholder="Search"
                    required
                />
            </div>
        </form>
    );
};

export default SearchComponent;
