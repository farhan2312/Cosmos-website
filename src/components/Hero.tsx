'use client';

export default function Hero() {
  return (
    // The main section is transparent in dark mode to show the global background
    <section className="bg-white dark:bg-transparent h-screen flex flex-col justify-center items-center text-center p-4">
      <div className="relative z-10">
        {/* The word "Cosmos" is now wrapped in a span with purple text colors */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gray-900 dark:text-white">
          <span className="text-purple-700 dark:text-purple-400">Cosmos</span>: Engineering the Future with AI.
        </h1>
        {/* Added theme-aware text colors to the paragraph */}
        <p className="text-lg md:text-xl max-w-2xl mb-8 mx-auto text-gray-600 dark:text-gray-300">
          We build intelligent systems that learn, adapt, and create.
        </p>
        <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-purple-500/50 transform transition-all duration-300 hover:scale-110 animate-pulse">
          Explore Our Innovations
        </button>
      </div>
    </section>
  );
}
