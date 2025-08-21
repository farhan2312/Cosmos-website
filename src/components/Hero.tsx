'use client';

import { CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    // The background gradient has been removed to make this section transparent
    <section 
      id="home" 
      className="relative text-white py-32 md:py-48 flex flex-col justify-center items-center text-center p-4 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-white">
          Navigate the Digital Universe with <span className="text-purple-300">Cosmic Innovation</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mb-8 mx-auto text-gray-300">
          Explore infinite possibilities with COSMOS Innovation Labs. From AI-powered galaxies to enterprise constellations, we chart your course through the digital cosmos.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a 
            href="#contact" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-purple-500/50 transform transition-all duration-300 hover:scale-105"
          >
            Launch Your Journey →
          </a>
          <a 
            href="#services" 
            className="bg-transparent border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-black font-bold py-3 px-8 rounded-lg transition-all duration-300"
          >
            Explore Our Galaxy
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-gray-300">
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-purple-400" />
            <span>Stellar Enterprise Solutions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-purple-400" />
            <span>UAE Based Expertise</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-purple-400" />
            <span>24/7 Mission Control</span>
          </div>
        </div>
      </div>
    </section>
  );
}
