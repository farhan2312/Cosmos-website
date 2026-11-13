import content from "./cosmos-content.json";

export const capabilities: [string, string, string, string][] = [
  ["AI and Intelligent Systems", "Make intelligence part of everyday business decisions.", "From generative AI and machine learning to intelligent agents and decision intelligence, we build systems that recognise patterns, evaluate options and support better decisions.", "ai-intelligent-systems"],
  ["Data & Decision Intelligence", "Turn fragmented information into clearer decisions.", "We connect fragmented data, build intelligent analytics and create a clearer view of what is happening across your business.", "data-decision-intelligence"],
  ["Intelligent Automation", "Automate repetitive work and enable smarter workflows.", "From intelligent workflows to AI-powered orchestration, we automate the work that slows teams down — from trigger to decision to action.", "intelligent-automation"],
  ["Enterprise Automation", "Connect enterprise processes and make business operations work together.", "From enterprise applications and integrations to organisation-wide process flows, we connect technology so your business can move as one.", "enterprise-automation"],
  ["Cloud and Digital Infrastructure", "Build the reliable digital foundations businesses depend on.", "Cloud, digital infrastructure, DevOps and scalable architecture — the secure, resilient foundations every modern business runs on.", "cloud-digital-infrastructure"],
  ["Emerging Technology", "Explore what comes next and where it can create value.", "We explore technologies that can create the next advantage — from intelligent systems and IoT to advanced computing and new digital architectures.", "emerging-technology"],
];
export const ecosystem: [string, string[]][] = [
  ["Artificial Intelligence", ["Generative AI", "Agentic AI", "Machine Learning", "RAG", "Intelligent Decision Systems"]],
  ["Automation", ["RPA", "Intelligent Workflows", "Process Automation", "AI Agents"]],
  ["Data", ["Data Engineering", "Analytics", "Business Intelligence", "Predictive Analytics"]],
  ["Enterprise", ["ERP", "CRM", "Enterprise Applications", "Integration", "Cloud"]],
  ["Emerging", ["IoT", "Blockchain", "Advanced Computing", "Digital Platforms"]],
];

export const stages = [
 {title:"Understand",body:"We start with your business, your processes and the problem you need to solve."},
 {title:"Design",body:"We shape the right technology around that reality — not the other way around."},
 {title:"Build",body:"We move from idea to working solution with speed and discipline."},
 {title:"Evolve",body:"Technology changes. Your business changes. We keep improving with you."},
];
export const qualities = [["Enterprise-ready", "Built for real business environments."], ["Practical", "Focused on outcomes, not technology for technology's sake."], ["Connected", "Designed to work with the systems you already have."], ["Future-ready", "Built to evolve as your business does."]];
export const layers = [
 {title:"Intelligence",items:["AI","Machine Learning","Generative AI","AI Agents","Decision Intelligence"],body:(content.services[0]?.intro??"")},
 {title:"Data",items:["Data Engineering","Analytics","Business Intelligence","Data Platforms","Predictive Intelligence"],body:(content.services[1]?.intro??"")},
 {title:"Automation",items:["Process Automation","RPA","Intelligent Workflows","AI-Powered Automation","Orchestration"],body:(content.services[2]?.intro??"")},
 {title:"Enterprise",items:["ERP","CRM","Enterprise Applications","APIs","Integration"],body:(content.services[3]?.intro??"")},
 {title:"Infrastructure",items:["Cloud","Digital Infrastructure","DevOps","Cybersecurity","Scalable Architecture"],body:(content.services[4]?.intro??"")},
 {title:"Emerging",items:["IoT","Digital Twins","Blockchain","Extended Reality","Advanced Computing"],body:(content.services[5]?.intro??"")},
];
export const futureTopics = (content.services[5]?.capabilities??[]);
export const capabilityTopics = [0,1,2,3,4,5].map(i=>content.services[i]?.capabilities??[]);
