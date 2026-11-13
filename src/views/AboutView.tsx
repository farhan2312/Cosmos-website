'use client';
import { useState } from "react";
import { Link } from "@/lib/nav";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { layers, stages } from "@/lib/cosmos-experience";
import { AboutCore, BusinessFirst, ComplexityClarity, ConnectedDesign, NextReady, StackArchitecture, StageArt } from "@/components/cosmos/about/AboutArt";
import { FinalCta, SectionHead } from "@/components/cosmos/Blocks";

 
const principles = [
  { title: "Business-first thinking", body: "Start with the operational challenge, business objective, and existing environment before choosing the technology.", Art: BusinessFirst },
  { title: "Connected by design", body: "Bring applications, data, automation, and intelligence together into a coherent technology environment.", Art: ConnectedDesign },
  { title: "Built for what comes next", body: "Create solutions that can evolve as business needs, systems, and capabilities change.", Art: NextReady },
];

export default function AboutView() {
  const [layer, setLayer] = useState(0);
  return (
    <div className="ab-page">
      <section className="ind-hero ab-hero">
        <div className="container ind-hero-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow eyebrow-line">About COSMOS</span>
            <h1>We build what comes next.</h1>
            <p>COSMOS Innovation Labs is a technology company focused on helping businesses use emerging and enterprise technology in meaningful ways.</p>
            <div className="hero-actions">
              <Button asChild><a href="#beliefs">More about COSMOS →</a></Button>
              <Link className="text-link" to="/contact">Talk to us <ArrowUpRight size={14} /></Link>
            </div>
          </div>
          <div className="ind-hero-visual"><AboutCore /></div>
        </div>
      </section>

      <section className="section ab-believe" id="beliefs">
        <div className="container ab-believe-grid">
          <div>
            <span className="eyebrow eyebrow-line">What we believe</span>
            <h2>Technology should make things simpler.</h2>
            <p className="ind-lead">From AI and automation to data and enterprise systems, we bring technology together around one simple goal: Make businesses work better.</p>
          </div>
          <ComplexityClarity />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead label="How we work" title={<>Start with the problem.<br />Build around the business.<br />Make it work.</>} />
          <ol className="ab-stages">
            {stages.map((s, i) => { const Art = StageArt[i]!; return (
              <li className="ab-stage" key={s.title}>
                <div className="ab-stage-art"><Art /></div>
                <span className="ab-stage-n">Stage 0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ); })}
          </ol>
        </div>
      </section>

      <section className="section ab-tech">
        <div className="container">
          <SectionHead label="Technology focus" title="Built across the technology stack." />
          <div className="ab-tech-grid">
            <StackArchitecture selected={layer} onSelect={setLayer} />
            <div className="ab-layer-list" role="list">
              {layers.map((l, i) => (
                <div role="listitem" key={l.title} className={`ab-layer-row ${layer === i ? "is-on" : ""}`}>
                  <button type="button" aria-pressed={layer === i} onClick={() => setLayer(i)}><span className="tiny-number">0{i + 1}</span>{l.title}</button>
                  {layer === i && <div className="ab-layer-items">{l.items.map((t) => <span key={t}>{t}</span>)}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section ab-principles">
        <div className="container">
          <SectionHead label="Our approach" title="Technology is only valuable when it works for the business." />
          <div className="ab-principle-grid">
            {principles.map(({ title, body, Art }, i) => (
              <article className="ab-principle" key={title}>
                <Art />
                <span className="tiny-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title="Have a problem worth solving?" body="Let's talk about it." cta="Start a conversation" />
    </div>
  );
}
