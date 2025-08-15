import AIBrain from './AIBrain'; // Import our new 3D model component

export default function Technology() {
  return (
    <section id="technology" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="mb-12">
          <h2 className="text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider">
            Galactic Domain Expertise
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mt-2">
            Our Technological Foundation
          </h3>
        </div>

        <div className="text-lg text-gray-600 dark:text-gray-300 space-y-6">
          <p>
            Our systems are built on a foundation of proprietary algorithms, state-of-the-art deep learning frameworks, and a hyper-scalable cloud architecture. This powerful combination ensures that our AI solutions are not only intelligent but also robust, efficient, and ready for enterprise-level deployment.
          </p>
          <p>
            We leverage custom-built neural networks and invest heavily in R&D to stay at the bleeding edge of artificial intelligence, turning complex data into actionable insights.
          </p>
        </div>

        {/* The placeholder is now replaced with our AIBrain component */}
        <div className="mt-12">
          <AIBrain />
        </div>

      </div>
    </section>
  );
}
