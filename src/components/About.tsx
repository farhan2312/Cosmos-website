import Timeline from '@/components/Timeline';

export default function About() {
  return (
    // The "bg-black" class has been removed from this line
    <section id="about" className="bg-white dark:bg-transparent text-gray-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-4">
          <h2 className="text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider">
            The Spark
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">
            Our Mission
          </h3>
          {/* The text color classes have been updated to match the Technology section */}
          <p className="text-lg text-gray-600 dark:text-gray-300">
            At Ignite, we believe in the power of artificial intelligence to solve the world's most complex problems. We are a team of passionate innovators, scientists, and engineers dedicated to pushing the boundaries of what's possible and building a brighter, more intelligent future for everyone.
          </p>
        </div>

        <div>
          <Timeline />
        </div>

      </div>
    </section>
  );
}
