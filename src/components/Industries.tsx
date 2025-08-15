import { Factory, ShoppingCart, Banknote, Activity, Stethoscope, Landmark, Signal, Network } from 'lucide-react';

export default function Industries() {
  const industries = [
    { title: 'Manufacturing', Icon: Factory },
    { title: 'Supply Chain', Icon: Network },
    { title: 'Retail & E-Commerce', Icon: ShoppingCart },
    { title: 'Financial Services', Icon: Banknote },
    { title: 'Energy & Utilities', Icon: Activity },
    { title: 'Healthcare & Life Sciences', Icon: Stethoscope },
    { title: 'Public Sector & Government', Icon: Landmark },
    { title: 'Telecom', Icon: Signal },
  ];
  return (
    <section id="industries" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider">Industries We Serve</h2>
          <h3 className="text-4xl md:text-5xl font-bold mt-2">Built for Your World</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map(({ title, Icon }) => (
            <div key={title} className="bg-gray-100/80 dark:bg-gray-900/60 backdrop-blur-sm p-8 rounded-lg border border-gray-200/50 dark:border-purple-500/40 transform transition-all duration-300 hover:scale-105 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/30">
              <Icon className="text-purple-700 dark:text-purple-400 mb-4" size={36} />
              <h4 className="text-2xl font-bold">{title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 