import { Cpu } from 'lucide-react';

export default function Services() {
  return (
    // The "bg-black" class has been removed from this line
    <section id="services" className="bg-white dark:bg-transparent text-gray-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider">
            The Forge
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mt-2">
            Our Core Services
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-gray-100 dark:bg-gray-900/50 p-8 rounded-lg border border-gray-200 dark:border-purple-500/30 transform transition-all duration-300 hover:scale-105 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="mb-4">
              <Cpu size={40} className="text-purple-700 dark:text-purple-400" />
            </div>
            <h4 className="text-2xl font-bold mb-2">Predictive Analytics</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Unlock future trends and make data-driven decisions with unparalleled accuracy.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-100 dark:bg-gray-900/50 p-8 rounded-lg border border-gray-200 dark:border-purple-500/30 transform transition-all duration-300 hover:scale-105 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="mb-4">
               <Cpu size={40} className="text-purple-700 dark:text-purple-400" />
            </div>
            <h4 className="text-2xl font-bold mb-2">Natural Language Processing</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Empower your applications to understand and interact with human language.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-100 dark:bg-gray-900/50 p-8 rounded-lg border border-gray-200 dark:border-purple-500/30 transform transition-all duration-300 hover:scale-105 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="mb-4">
               <Cpu size={40} className="text-purple-700 dark:text-purple-400" />
            </div>
            <h4 className="text-2xl font-bold mb-2">Computer Vision</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Enable systems to interpret and understand the visual world, from images to real-time video.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}