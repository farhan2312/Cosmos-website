import { CheckCircle, Users, Globe, TrendingUp, Activity } from 'lucide-react';

export default function About() {
  const stats = [
    { value: '500+', label: 'Missions Completed', Icon: Users },
    { value: '15+', label: 'Galaxies Explored', Icon: Globe },
    { value: '98%', label: 'Stellar Success Rate', Icon: TrendingUp },
    { value: '24/7', label: 'Mission Control', Icon: Activity },
  ];

  return (
    <section 
      id="about" 
      // The background gradient has been removed to make this section transparent
      className="text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Text Content */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Pioneering Cosmic Innovation in the UAE
          </h2>
          <p className="text-lg text-gray-300">
            With deep understanding of the UAE digital cosmos and cutting-edge technology expertise, we partner with businesses to achieve stellar excellence and sustainable growth across infinite possibilities.
          </p>
          <p className="text-lg text-gray-300">
            Our constellation of certified space navigators brings years of experience in delivering enterprise-grade solutions that transform businesses across Dubai, Abu Dhabi, and the broader UAE cosmic region.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-purple-400" size={20} />
              <span>Certified Cosmic Partners: Microsoft, SAP, AWS</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-purple-400" size={20} />
              <span>ISO 27001 Galactic Security Certified</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-purple-400" size={20} />
              <span>UAE Cosmic Council Approved Vendor</span>
            </li>
          </ul>
        </div>

        {/* Right Column: Stat Cards */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-md p-6 rounded-lg text-center border border-white/20">
              <stat.Icon className="mx-auto mb-3 text-purple-300" size={32} />
              <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
