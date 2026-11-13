'use client';
import { Link } from "@/lib/nav";
import { ArrowUpRight } from "lucide-react";
import content from "@/lib/cosmos-content.json";
import { Button } from "@/components/ui/button";
import { IndustryConstellation } from "@/components/cosmos/industries/IndustryConstellation";
import { ConvergeAccent, IndustryEcosystem } from "@/components/cosmos/industries/IndustryArt";
import { SectionHead } from "@/components/cosmos/Blocks";

 
export default function IndustriesView() {
  return (
    <div className="ind-page">
      <section className="ind-hero">
        <div className="container ind-hero-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow eyebrow-line">Industries</span>
            <h1>Technology that understands your industry.</h1>
            <p>Every industry has its own challenges, systems and opportunities. We bring AI, data, automation and enterprise technology together around the way your business works.</p>
            <div className="hero-actions">
              <Button asChild><a href="#constellation">Explore industries →</a></Button>
              <Link className="text-link" to="/contact">Talk to us <ArrowUpRight size={14} /></Link>
            </div>
          </div>
          <div className="ind-hero-visual">
            <IndustryEcosystem slugs={content.industries.map((i) => i.slug)} label="Nine industry environments connected to one COSMOS intelligence layer" />
          </div>
        </div>
      </section>
      <section className="section ind-constellation-section" id="constellation">
        <div className="container">
          <SectionHead label="Industry Constellation" title={<>Different industries.<br />Different challenges.<br />Connected possibilities.</>} />
          <IndustryConstellation />
        </div>
      </section>
      <section className="ind-cta">
        <div className="container ind-cta-grid">
          <div>
            <span className="eyebrow eyebrow-line">Start a conversation</span>
            <h2>Your industry has its own challenges.<br />The right technology should reflect them.</h2>
            <p>Let's explore what could work better.</p>
            <Button asChild className="cta-button"><Link to="/contact">Talk to COSMOS <ArrowUpRight /></Link></Button>
          </div>
          <ConvergeAccent />
        </div>
      </section>
    </div>
  );
}
