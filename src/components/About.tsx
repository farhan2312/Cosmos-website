'use client';

import { useState } from 'react';
import { Rocket, Lightbulb, Zap, BrainCircuit } from 'lucide-react';

const timelineData = [
  { year: '2021', title: 'The Spark of an Idea', description: 'Cosmos was founded in a small research lab by a team of AI pioneers with a shared vision.', icon: <Lightbulb /> },
  { year: '2022', title: 'First Breakthrough', description: 'Our first proprietary learning algorithm achieved a 99.8% accuracy rate, outperforming existing models.', icon: <Zap /> },
  { year: '2024', title: 'Securing the Future', description: 'Secured Series A funding, allowing us to expand our team and computational resources.', icon: <BrainCircuit /> },
  { year: '2025', title: 'Global Launch', description: 'Launched our flagship AI platform, making our technology accessible to businesses worldwide.', icon: <Rocket /> },
];

const Timeline = () => {
  const [activeMilestone, setActiveMilestone] = useState(3);
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gray-100 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-purple-500/30 mb-8 h-40 flex flex-col justify-center">
        <p className="text-sm text-purple-700 dark:text-purple-400 font-semibold mb-1">{timelineData[activeMilestone].year}</p>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{timelineData[activeMilestone].title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{timelineData[activeMilestone].description}</p>
      </div>
      <div className="flex items-center">
        {timelineData.map((item, index) => (
          <div key={index} className="flex-1 flex items-center" onClick={() => setActiveMilestone(index)}>
            {index < timelineData.length && <div className={`flex-1 h-0.5 transition-colors duration-300 ${activeMilestone >= index ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>}
            <div className="relative cursor-pointer">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeMilestone === index ? 'bg-purple-500 scale-125' : 'bg-gray-500 dark:bg-gray-600'}`}><div className="text-white">{item.icon}</div></div>
            </div>
            {index < timelineData.length - 1 && <div className={`flex-1 h-0.5 transition-colors duration-300 ${activeMilestone > index ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function About() {
  return (
    <section id="about" className="bg-white dark:bg-transparent text-gray-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-4">
          <h2 className="text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider">The Spark</h2>
          <h3 className="text-4xl md:text-5xl font-bold">Our Mission</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            At Cosmos, we believe in the power of artificial intelligence to solve the world&apos;s most complex problems. We are a team of passionate innovators, scientists, and engineers dedicated to pushing the boundaries of what&apos;s possible and building a brighter, more intelligent future for everyone.
          </p>
        </div>
        <div><Timeline /></div>
      </div>
    </section>
  );
}