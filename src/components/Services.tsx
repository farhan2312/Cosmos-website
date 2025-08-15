import { BrainCircuit, Cpu, Layers, Rocket } from 'lucide-react';

export default function Services() {
  // Services have been consolidated into four main pillars
  const servicePillars = [
    {
      title: 'AI & Data Intelligence',
      description: 'Transform raw data into predictive insights and leverage cutting-edge AI models, including Generative and Agentic AI, to drive decision-making.',
      Icon: BrainCircuit,
    },
    {
      title: 'Intelligent Automation',
      description: 'Streamline operations and enhance workflows with cognitive automation and RPA, reducing costs and improving accuracy across your enterprise.',
      Icon: Cpu,
    },
    {
      title: 'Enterprise Applications',
      description: 'Build and connect mission-critical systems. We deliver custom applications and seamless integrations for platforms like SAP and Microsoft Dynamics.',
      Icon: Layers,
    },
    {
      title: 'Strategic & Future-Ready Solutions',
      description: 'Optimize complex operations like supply chains and prepare for the future with emerging technologies including IoT, Blockchain, and Quantum readiness.',
      Icon: Rocket,
    },
  ];

  return (
    <section id="services" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider">
            Cosmic IT Solutions
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mt-2">
            A Full Suite of IT Services to Elevate Your Business
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
            Our solutions are designed for efficiency, scalability, and security, covering the entire technology lifecycle, from consulting and implementation to optimization and support.
          </p>
        </div>

        {/* Updated to a 2x2 grid for a cleaner look */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicePillars.map((service) => (
            <div key={service.title} className="bg-gray-100/80 dark:bg-gray-900/60 backdrop-blur-sm p-8 rounded-lg border border-gray-200/50 dark:border-purple-500/40 transform transition-all duration-300 hover:scale-105 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/30">
              <div className="mb-4">
                <service.Icon size={40} className="text-purple-700 dark:text-purple-400" />
              </div>
              <h4 className="text-2xl font-bold mb-3">{service.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
