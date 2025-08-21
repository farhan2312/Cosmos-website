'use client'; // This needs to be a client component for the onClick handler to work

import { Linkedin, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  // This function handles the smooth scroll when a link is clicked
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
    // The background gradient has been removed to make the footer transparent
    <footer className="text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top section with four columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: COSMOS Innovation Labs */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg uppercase tracking-wider">COSMOS Innovation Labs</h3>
            <p className="text-gray-300 text-sm">
              Leading cosmic IT services provider in the UAE, delivering innovative solutions that drive digital transformation across infinite business galaxies.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-md transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-md transition-colors"><Twitter size={20} /></a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-md transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Column 2: Cosmic Services */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Cosmic Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {/* Updated links to point to the #services section */}
              <li><a href="#services" onClick={handleLinkClick} className="hover:text-purple-300">RPA Solutions</a></li>
              <li><a href="#services" onClick={handleLinkClick} className="hover:text-purple-300">Big Data Analytics</a></li>
              <li><a href="#services" onClick={handleLinkClick} className="hover:text-purple-300">AI/ML Solutions</a></li>
              <li><a href="#services" onClick={handleLinkClick} className="hover:text-purple-300">ERP Integration</a></li>
              <li><a href="#services" onClick={handleLinkClick} className="hover:text-purple-300">Application Development</a></li>
            </ul>
          </div>

          {/* Column 3: Galactic Solutions */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Galactic Solutions</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {/* Updated links to point to the #services section */}
              <li><a href="#services" onClick={handleLinkClick} className="hover:text-purple-300">Supply Chain Galaxy</a></li>
              <li><a href="#services" onClick={handleLinkClick} className="hover:text-purple-300">Middleware Integration</a></li>
              <li><a href="#services" onClick={handleLinkClick} className="hover:text-purple-300">RAG & Agentic AI</a></li>
              <li><a href="#services" onClick={handleLinkClick} className="hover:text-purple-300">Enterprise AI</a></li>
              <li><a href="#services" onClick={handleLinkClick} className="hover:text-purple-300">Cosmic Staff Augmentation</a></li>
            </ul>
          </div>

          {/* Column 4: Mission Control Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Mission Control Info</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3"><Phone size={16} className="text-purple-300" /><span>+971 54 459 0094</span></li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-purple-300" /><span>info@cosmoslabs.tech</span></li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-purple-300" /><span>Meydan, Dubai, UAE</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom section with copyright */}
        <div className="border-t border-white/20 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} COSMOS Innovation Labs. All rights reserved | <a href="#" className="hover:text-purple-300">Privacy Policy</a> | <a href="#" className="hover:text-purple-300">Terms of Service</a></p>
        </div>

      </div>
    </footer>
  );
}
