'use client';

import { useState } from 'react';
import { Rocket, Lightbulb, Zap, BrainCircuit } from 'lucide-react';

// Define the data for our timeline milestones
const timelineData = [
  {
    year: '2021',
    title: 'The Spark of an Idea',
    description: 'Cosmos was founded in a small research lab by a team of AI pioneers with a shared vision.',
    icon: <Lightbulb />,
  },
  {
    year: '2022',
    title: 'First Breakthrough',
    description: 'Our first proprietary learning algorithm achieved a 99.8% accuracy rate, outperforming existing models.',
    icon: <Zap />,
  },
  {
    year: '2024',
    title: 'Securing the Future',
    description: 'Secured Series A funding, allowing us to expand our team and computational resources.',
    icon: <BrainCircuit />,
  },
  {
    year: '2025',
    title: 'Global Launch',
    description: 'Launched our flagship AI platform, making our technology accessible to businesses worldwide.',
    icon: <Rocket />,
  },
];

export default function Timeline() {
  // State to keep track of the active milestone index
  const [activeMilestone, setActiveMilestone] = useState(3);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Milestone Details Display */}
      <div className="bg-gray-100 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-purple-500/30 mb-8 h-40 flex flex-col justify-center">
        <p className="text-sm text-purple-700 dark:text-purple-400 font-semibold mb-1">{timelineData[activeMilestone].year}</p>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{timelineData[activeMilestone].title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{timelineData[activeMilestone].description}</p>
      </div>

      {/* The actual timeline visual */}
      <div className="flex items-center">
        {timelineData.map((item, index) => (
          <div key={index} className="flex-1 flex items-center" onClick={() => setActiveMilestone(index)}>
            {/* The line connecting the dots */}
            {index < timelineData.length && (
              <div className={`flex-1 h-0.5 transition-colors duration-300 ${activeMilestone >= index ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            )}
            
            {/* The dot and the icon */}
            <div className="relative cursor-pointer">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeMilestone === index ? 'bg-purple-500 scale-125' : 'bg-gray-500 dark:bg-gray-600'}`}>
                <div className="text-white">{item.icon}</div>
              </div>
            </div>

            {/* The line connecting the dots */}
            {index < timelineData.length -1 && (
              <div className={`flex-1 h-0.5 transition-colors duration-300 ${activeMilestone > index ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}