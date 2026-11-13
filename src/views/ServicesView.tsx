'use client';
import { Link } from "@/lib/nav";
import { ArrowUpRight } from "lucide-react";
import content from "@/lib/cosmos-content.json";
import { ServiceHero } from "@/components/cosmos/glyphs/ServiceHeroes";
import { FinalCta, SectionHead } from "@/components/cosmos/Blocks";

 
export default function ServicesView() {
  return (
    <>
      <section className="section soft services-overview">
        <div className="container">
          <SectionHead label="Services" title="From complexity to clarity.">Four areas. One connected technology partner.</SectionHead>
          <div className="service-index-grid">
            {content.services.map((s, i) => (
              <article className="service-index-item" key={s.slug}>
                <div><span className="tiny-number">0{i + 1}</span><span className="node-dot" /></div>
                <h2>{s.name}</h2>
                <p>{s.hero} {s.intro}</p>
                <div className="service-card-art" aria-hidden="true"><ServiceHero slug={s.slug} label={s.name} /></div>
                <Link className="text-link" to="/services/$slug" params={{ slug: s.slug }}>Explore → <ArrowUpRight size={13} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCta title="Have a problem worth solving?" body="Let's talk about it." cta="Start a conversation" />
    </>
  );
}
