'use client';
import { Link } from "@/lib/nav";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IntelligenceEngine } from "@/components/cosmos/IntelligenceEngine";
import { ConnectionTransform, CapabilityShowcase, ApproachJourney, Differentiators, EcosystemExplorer, ProblemSequence, FutureExplorer, Convergence, ConnectedDomains } from "@/components/cosmos/ExperienceSections";
import { TechField } from "@/components/cosmos/TechField";
import { HorizontalJourney } from "@/components/cosmos/HorizontalJourney";
import { FinalCta, SectionHead } from "@/components/cosmos/Blocks";

 
const JOURNEY = ["Technology that moves business forward", "Our view", "Capabilities", "COSMOS Approach", "Connected Intelligence", "Why COSMOS", "Technology Ecosystem", "The problem comes first", "Future", "About COSMOS", "Start a conversation"];

export default function HomeView() {
  return (
    <HorizontalJourney labels={JOURNEY} widths={[100, 110, 190, 110, 110, 110, 110, 110, 110, 110, 100]}>
      <section className="home-hero experience-hero">
        <div className="engine-hero-scene"><IntelligenceEngine /></div>
        <div className="container">
          <div className="hero-copy reveal">
            <span className="eyebrow eyebrow-line">COSMOS Innovation Labs</span>
            <h1><span className="hero-brand-title">COSMOS</span>Technology that moves business <span>forward.</span></h1>
            <p>AI, data and enterprise technology built around the way your business actually works.</p>
            <p className="hero-description">We help organizations turn complex technology into simpler decisions, smarter operations and measurable growth.</p>
            <div className="hero-actions">
              <Button asChild><Link to="/services">Explore our capabilities <ArrowUpRight /></Link></Button>
              <Link className="text-link" to="/contact">Talk to us <ArrowUpRight size={14} /></Link>
            </div>
          </div>
        </div>
        <div className="hero-bottom"><span>AI · Automation · Data · Enterprise Technology</span><span className="scroll-arrow">↓</span></div>
      </section>

      <section className="opening-section experience-opening has-field">
        <TechField variant="network" />
        <div className="container opening-grid">
          <span className="eyebrow eyebrow-line">Our view</span>
          <div>
            <h2>Technology should make things simpler.</h2>
            <div className="opening-bottom">
              <div className="opening-lines"><p className="muted">Not another platform.</p><p className="muted">Not another transformation programme.</p><p>Just better ways to work.</p></div>
              <p>COSMOS brings together AI, automation, data and enterprise technology to solve the problems that matter most to your business.</p>
            </div>
          </div>
          <ConnectionTransform />
        </div>
      </section>

      <section className="section soft experience-capabilities">
        <div className="container">
          <SectionHead label="Capabilities" title="From complexity to clarity.">Four areas. One connected technology partner.</SectionHead>
          <CapabilityShowcase />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead label="COSMOS Approach" title={<>Start with the problem.<br />Build around the business.<br />Make it work.</>} />
          <ApproachJourney />
        </div>
      </section>

      <section className="section connected-section has-field">
        <TechField variant="orbit" />
        <div className="container experience-connected-grid">
          <div>
            <span className="eyebrow eyebrow-line">Connected Intelligence</span>
            <h2>Intelligence, connected.</h2>
            <p>AI shouldn't sit on its own.<br />Data shouldn't sit on its own.<br />Your enterprise systems shouldn't sit on their own.<br /><strong>COSMOS connects them.</strong></p>
          </div>
          <ConnectedDomains />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead label="Why COSMOS" title={<>Technology expertise.<br />Business understanding.</>}>We bring together technology specialists, engineers and business thinkers to build solutions that work beyond the prototype.</SectionHead>
          <Differentiators />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead label="Technology Ecosystem" title="Built across the technology stack." link={<Link className="text-link" to="/technology">Explore the technology <ArrowUpRight size={13} /></Link>} />
          <EcosystemExplorer />
        </div>
      </section>

      <section className="statement-section has-field">
        <TechField variant="circuit" />
        
        <div className="container statement-content">
          <div>
            <span className="eyebrow eyebrow-line">We don't start with technology.</span>
            <h2>We start with the question: <span>What needs to work better?</span></h2>
          </div>
          <p>Then we determine whether the answer is AI, automation, data, enterprise technology — or a combination of them. That's how technology becomes useful.</p>
        </div>
        <div className="container"><ProblemSequence /></div>
      </section>

      <section className="section has-field">
        <TechField variant="path" />
        <div className="container future-grid">
          <div>
            <span className="eyebrow eyebrow-line">Future</span>
            <h2>The next advantage may not exist yet.</h2>
            <p>Technology is moving quickly.<br />AI is changing how work gets done.<br />Data is changing how decisions are made.<br />Automation is changing how organizations operate.</p>
            <p>We help you understand what matters, experiment with what works and build what comes next.</p>
            <Link className="text-link" to="/services/$slug" params={{ slug: "emerging-technology" }}>Explore emerging technology <ArrowUpRight size={13} /></Link>
          </div>
          <FutureExplorer />
        </div>
      </section>

      <section className="section soft cx-about">
        <div className="container cx-about-grid">
          <div className="cx-about-copy">
            <span className="eyebrow eyebrow-line">About COSMOS</span>
            <h2>We build what comes next.</h2>
            <p>COSMOS Innovation Labs is a technology company focused on helping businesses use emerging and enterprise technology in meaningful ways.</p>
            <p>From AI and automation to data and enterprise systems, we bring technology together around one simple goal: Make businesses work better.</p>
            <Link className="text-link" to="/about">More about COSMOS <ArrowUpRight size={13} /></Link>
          </div>
          <div className="cx-about-art"><Convergence /></div>
        </div>
      </section>

      <FinalCta title="Have a problem worth solving?" body={<>Let's talk about it. Whether you're exploring AI, modernizing your technology stack or looking for a better way to use your data, we'll start with the problem — and work from there.</>} cta="Start a conversation" />
    </HorizontalJourney>
  );
}
