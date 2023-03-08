import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white font-bold text-xl">My Website</a>
          </div>
          <div className="flex items-center">
            <a href="https://tailwindcss.com/docs" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Docs</a>
            <a href="https://github.com/myusername/my-repo" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">GitHub</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;