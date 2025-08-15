'use client'; 

import { Sparkles } from 'lucide-react'; 

export default function Navbar() {

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); 
    const targetId = e.currentTarget.hash.substring(1);
    const elem = document.getElementById(targetId);
    
    if (elem) {
      elem.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav 
      className="fixed top-0 w-full z-50 transition-all duration-300 bg-black/80 backdrop-blur-sm shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <a href="#" className="flex-shrink-0 flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-purple-400" />
            {/* The brand name has been updated */}
            <span className="font-bold text-xl text-white tracking-wider">COSMOS Innovation Labs</span>
          </a>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#services" onClick={handleLinkClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
              <a href="#about" onClick={handleLinkClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#technology" onClick={handleLinkClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Technology</a>
              <a href="#why" onClick={handleLinkClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Why Us</a>
              <a href="#industries" onClick={handleLinkClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Industries</a>
              <a href="#contact" onClick={handleLinkClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
