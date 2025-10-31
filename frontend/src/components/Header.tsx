import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useSearch } from "../context/SearchContext";

const Header: React.FC = () => {
  const { setSearchTerm } = useSearch();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setSearchTerm(inputValue); 
    
  };

  return (
    <header className="w-full flex items-center justify-between z-50 bg-[#F9F9F9] shadow-[0_2px_16px_rgba(0,0,0,0.1)] 
      px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[124px] py-4">
      
      {/* Left: Logo */}
      <img 
        src={logo} 
        alt="Logo" 
        className="w-[100px] h-[55px] object-contain" 
      />

      {/* Right: Search section */}
      <div className="flex items-center gap-4 w-full max-w-md md:max-w-lg">
        {/* Search box */}
        <div className="flex items-center bg-[#EDEDED] rounded-md px-4 py-3 w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search experiences"
            className="flex-1 bg-transparent outline-none border-none
              text-sm font-normal text-[#727272] font-inter placeholder:text-[#727272]"
          />
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-[#FFD643] text-[#161616] font-inter font-medium text-sm rounded-lg px-5 py-3 
            hover:bg-[#e6c33b] transition-colors hover:cursor-pointer"
        >
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
