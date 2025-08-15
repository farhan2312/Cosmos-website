import { CheckCircle, Rocket, ShieldCheck, Layers, Cpu, Compass, PencilRuler, Truck, RefreshCcw } from 'lucide-react';

export default function WhyChooseUs() {
  const stats = [
    { value: 'Innovation First', description: 'We bring tomorrow’s technology today.', Icon: Rocket },
    { value: 'Security by Design', description: 'Robust cybersecurity baked into every solution.', Icon: ShieldCheck },
    { value: 'Scalable Architecture', description: 'Grow without limits, built for the future.', Icon: Layers },
    { value: 'Industry Expertise', description: 'Proven success across multiple sectors.', Icon: Cpu },
  ];

  const approachSteps = [
    { title: 'Discover', desc: 'Collaborative workshops to align vision', Icon: Compass },
    { title: 'Design', desc: 'Tailored solutions for unique business needs', Icon: PencilRuler },
    { title: 'Deliver', desc: 'Rapid prototyping & agile delivery', Icon: Truck },
    { title: 'Optimize', desc: 'Continuous improvement for long-term success', Icon: RefreshCcw },
  ];

  return (
    <section 
      id="why" 
      // The background gradient has been removed to make this section transparent
      className="text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Part: Why Choose Us */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Stat Cards (Mirrored Layout) */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.value} className="bg-white/10 backdrop-blur-md p-6 rounded-lg text-center border border-white/20">
                <stat.Icon className="mx-auto mb-3 text-purple-300" size={32} />
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Right Column: Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Pioneering Cosmic Innovation in the UAE
            </h2>
            <p className="text-lg text-gray-300">
              With deep understanding of the UAE digital cosmos and cutting-edge technology expertise, we partner with businesses to achieve stellar excellence and sustainable growth across infinite possibilities.
            </p>
            <p className="text-lg text-gray-300">
              Our constellation of certified space navigators brings years of experience in delivering enterprise-grade solutions that transform businesses across the UAE.
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
        </div>

        {/* Bottom Part: Our Approach */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold mt-2">Our Approach</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approachSteps.map(({ title, desc, Icon }) => (
              <div key={title} className="bg-white/10 backdrop-blur-md p-8 rounded-lg text-center border border-white/20 transform transition-all duration-300 hover:scale-105">
                <Icon className="text-purple-300 mb-4 mx-auto" size={36} />
                <h4 className="text-2xl font-bold mb-2">{title}</h4>
                <p className="text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
