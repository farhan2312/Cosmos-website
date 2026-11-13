'use client';
import { SectionHead } from "@/components/cosmos/Blocks";
import { BusinessFunctions, EnterpriseIntegration, EnterpriseIntelligence, TechnologyCta, TechnologyEcosystem, TechnologyHero, TechnologyLab, TechnologyStack } from "@/components/cosmos/TechnologyExperience";
import { IntelligenceRelationship } from "@/components/cosmos/TechnologyVisuals";

 
const aiLayers = [
  ["AI + Data", "Turn enterprise data into context, insight and intelligence."],
  ["AI + Applications", "Bring intelligence directly into the tools people use every day."],
  ["AI + Automation", "Let AI understand, decide and trigger actions across workflows."],
  ["AI + People", "Give teams intelligent assistance where it can make the greatest difference."],
  ["AI + Decisions", "Bring intelligence closer to the decisions that matter."],
];
const fabric = [
  ["Connect", "Applications, platforms, data and devices."],
  ["Integrate", "Create reliable pathways between systems."],
  ["Orchestrate", "Coordinate processes across the enterprise."],
  ["Intelligence", "Use data and AI across the connected environment."],
  ["Outcome", "A technology ecosystem that works as one."],
];
const ecosystem: [string, string[]][] = [
  ["Cloud", ["Cloud platforms", "Hybrid environments", "Cloud infrastructure"]],
  ["Enterprise Platforms", ["ERP", "CRM", "Enterprise applications"]],
  ["Data", ["Data platforms", "Analytics", "Business intelligence"]],
  ["AI", ["Generative AI", "Machine learning", "AI agents"]],
  ["Integration", ["APIs", "Middleware", "System integration"]],
  ["Infrastructure", ["DevOps", "Security", "Digital infrastructure"]],
];

export default function TechnologyView() {
  return (
    <div className="technology-page">
      <TechnologyHero />
      <section className="section" id="stack">
        <div className="container">
          <SectionHead label="The COSMOS Technology Stack" title={<>One stack.<br />Connected intelligence.</>}>Technology works better when the pieces work together. Our technology stack brings together the capabilities businesses need to build, connect and scale intelligent digital environments.</SectionHead>
          <TechnologyStack />
          <p className="closing-line">Different technologies. One connected foundation.</p>
        </div>
      </section>
      <section className="section tech-intelligence-section">
        <div className="container">
          <SectionHead label="AI as an Enterprise Intelligence Layer" title={<>AI shouldn't sit on the sidelines.<br />It should work across the enterprise.</>}>COSMOS brings AI into the systems, data and processes that keep your business moving.</SectionHead>
          <EnterpriseIntelligence />
          <div className="ai-descriptions">{aiLayers.map(([t, b],i) => <div key={t}><IntelligenceRelationship index={i}/><h3>{t}</h3><p>{b}</p></div>)}</div>
          <p className="closing-line">AI becomes more powerful when it becomes part of the enterprise.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead label="Enterprise Integration Fabric" title="Everything connected.">Modern enterprises run across hundreds of applications, platforms and data sources. COSMOS creates the connections that allow them to work together.</SectionHead>
          <EnterpriseIntegration />
          <div className="integration-steps">{fabric.map(([t, b]) => <div key={t}><h3>{t}</h3><p>{b}</p></div>)}</div>
          <p className="closing-line">From disconnected systems to connected enterprise.</p>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead label="Technology by Business Function" title="Technology where work happens.">Technology creates value when it reaches the people and processes that need it.</SectionHead>
          <BusinessFunctions />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead label="Technology Ecosystem" title="Built to work with what you already have.">COSMOS doesn't ask businesses to start again. We work across the technology environments that already power the enterprise — connecting what exists, modernising where needed and introducing new capabilities where they create value.</SectionHead>
          <TechnologyEcosystem groups={ecosystem}/>
          <p className="closing-line">Build new where it matters. Connect what already works.</p>
        </div>
      </section>
      <section className="section lab-section">
        <div className="container">
          <div className="tech-lab-intro">
            <div>
              <span className="eyebrow eyebrow-line">COSMOS Lab</span>
              <h2>Where ideas become possibilities.</h2>
              <p>COSMOS Lab is where we explore emerging technologies, test new ideas and turn promising concepts into practical solutions.</p>
            </div>
          </div>
          <TechnologyLab />
          <p className="lab-closing">AI. Data. Automation. Emerging technology. We explore what they could become together.</p>
        </div>
      </section>
      <TechnologyCta />
    </div>
  );
}
