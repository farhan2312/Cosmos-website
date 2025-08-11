import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-transparent text-gray-900 dark:text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-purple-500/20">
      <div className="max-w-7xl mx-auto text-center">
        
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors duration-300">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors duration-300">
            <Github size={24} />
          </a>
          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors duration-300">
            <Linkedin size={24} />
          </a>
        </div>

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Ignite Technologies Inc. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
