import { Compass, PencilRuler, Truck, RefreshCcw } from 'lucide-react';

export default function WhyChooseUs() {
  const approachSteps = [
    { title: 'Discover', desc: 'Collaborative workshops to align vision', Icon: Compass },
    { title: 'Design', desc: 'Tailored solutions for unique business needs', Icon: PencilRuler },
    { title: 'Deliver', desc: 'Rapid prototyping & agile delivery', Icon: Truck },
    { title: 'Optimize', desc: 'Continuous improvement for long-term success', Icon: RefreshCcw },
  ];

  return (
    <section 
      id="why" 
      className="text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* The top part with stats and certifications has been removed. */}

        {/* Our Approach Section */}
        <div>
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