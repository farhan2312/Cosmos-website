export default function Contact() {
  return (
    <section id="contact" className="bg-white dark:bg-transparent text-gray-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider">
            Join the Ignition
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mt-2">
            Contact Us
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            {/* THE FIX: Replaced the apostrophe in "We'd" with "&apos;" */}
            Have a question or a project in mind? We&apos;d love to hear from you.
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input type="text" name="name" id="name" placeholder="Your Name" className="w-full bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input type="email" name="email" id="email" placeholder="Your Email" className="w-full bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea name="message" id="message" rows={4} placeholder="Your Message" className="w-full bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
          </div>
          <div>
            <button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-purple-500/50 transform transition-all duration-300 hover:scale-105">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
}
