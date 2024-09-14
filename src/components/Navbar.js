import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <a href="/">Logo</a>
        </div>


        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-white hover:text-blue-500">Home</a>
          <a href="/about" className="text-white hover:text-blue-500">About Us</a>
          <a href="/Business Unit" className="text-white hover:text-blue-500">About</a>
          <a href="/sustain" className="text-white hover:text-blue-500">Sustaiablity</a>
          <a href="/media" className="text-white hover:text-blue-500">Media</a>
          <a href="/career" className="text-white hover:text-blue-500">Career</a>
          <a href="/contact" className="text-white hover:text-blue-500">Contact</a>

        </div>


        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <a href="/" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-200">Home</a>
          <a href="/contact" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-200">Contact</a>
          <a href="/about" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-200">About</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
