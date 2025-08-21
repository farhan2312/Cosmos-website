'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Launch() {
  // State to manage form submission status
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Submitting....");
    const formData = new FormData(event.currentTarget);

    // --- IMPORTANT: PASTE YOUR ACCESS KEY HERE ---
    formData.append("access_key", "f60624cf-a9ff-4383-b25b-84b5f627bb84"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        // Reset the form after a successful submission
        (event.target as HTMLFormElement).reset(); 
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Something went wrong!");
    }

    // Hide the result message after 5 seconds
    setTimeout(() => {
      setResult(null);
    }, 5000);
  };

  return (
    <section id="contact" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Launch Your Digital Odyssey?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
            Connect with our cosmic navigators to discuss your IT requirements and discover how we can help accelerate your journey through the digital universe.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Or, <span className="text-purple-600 dark:text-purple-400 font-semibold">schedule a demo</span> with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-100 dark:bg-gray-900/50 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6">Launch Free Mission Briefing</h3>
            {/* The onSubmit handler is added to the form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">First Name</label>
                  <input type="text" name="firstName" id="firstName" required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"/>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Last Name</label>
                  <input type="text" name="lastName" id="lastName" required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"/>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Email</label>
                <input type="email" name="email" id="email" required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"/>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Phone</label>
                <input type="tel" name="phone" id="phone" required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"/>
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Galaxy of Interest</label>
                <select name="interest" id="interest" required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2">
                  <option>Select a galaxy</option>
                  <option>AI & Data Intelligence</option>
                  <option>Intelligent Automation</option>
                  <option>Enterprise Applications</option>
                  <option>Strategic Solutions</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Message</label>
                <textarea name="message" id="message" rows={4} required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"></textarea>
              </div>
              <button type="submit" className="w-full font-bold py-3 px-6 rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
                Launch Message
              </button>
              {/* Display the result message here */}
              {result && <p className="text-center mt-4">{result}</p>}
            </form>
          </div>

          <div className="space-y-8 flex flex-col">
            <div className="bg-gray-100 dark:bg-gray-900/50 p-8 rounded-lg border border-gray-200 dark:border-gray-700 flex-grow flex flex-col">
              <h3 className="text-2xl font-bold mb-6">Mission Control Center</h3>
              <ul className="space-y-4 flex-grow">
                <li className="flex items-start gap-4"><Phone className="text-purple-500 mt-1"/><div><strong>Cosmic Hotline</strong><p className="text-gray-600 dark:text-gray-300">+971 54 459 0094</p></div></li>
                <li className="flex items-start gap-4"><Mail className="text-purple-500 mt-1"/><div><strong>Galactic Mail</strong><p className="text-gray-600 dark:text-gray-300">info@cosmoslabs.tech</p></div></li>
                <li className="flex items-start gap-4"><MapPin className="text-purple-500 mt-1"/><div><strong>Space Station</strong><p className="text-gray-600 dark:text-gray-300">Meydan, Dubai, UAE</p></div></li>
                <li className="flex items-start gap-4"><Clock className="text-purple-500 mt-1"/><div><strong>Mission Hours</strong><p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9 AM - 6 PM</p></div></li>
              </ul>
            </div>
            <div className="p-8 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <h3 className="text-2xl font-bold mb-4">Emergency Mission Control</h3>
              <p className="mb-6">Need immediate cosmic assistance? Our emergency mission control team is available 24/7 to help resolve critical system anomalies.</p>
              <a href="#" className="bg-white/90 hover:bg-white text-purple-700 font-bold py-2 px-4 rounded-md transition-all duration-300">
                Contact Emergency Control
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
