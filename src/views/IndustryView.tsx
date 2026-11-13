'use client';
import { Link } from "@/lib/nav";
import { ArrowUpRight } from "lucide-react";
import content from "@/lib/cosmos-content.json";
import { Button } from "@/components/ui/button";
import { Glyph } from "@/components/cosmos/glyphs/Glyphs";
import { ChallengeVisual, IndustryScene } from "@/components/cosmos/industries/IndustryArt";
import { challengeSystems, pageGlyphs } from "@/lib/industry-visuals";
import { FinalCta, SectionHead } from "@/components/cosmos/Blocks";

 
export default function IndustryView({ index }: { index: number }) {
  const s = content.industries[index]!;
  const g = pageGlyphs(s.opportunities.map((o) => o.title), s.useCases, index);
  const systems = challengeSystems[s.slug] ?? ["Systems", "Processes", "Data", "Teams"];
  return (
    <div className={`ind-page ind-detail ind-v${index % 3}`}>
      <section className="ind-hero">
        <div className="container ind-hero-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow eyebrow-line">{s.name}</span>
            <h1>{s.hero}</h1>
            <p>{s.intro}</p>
            <div className="hero-actions">
              <Button asChild><a href="#opportunities">Explore →</a></Button>
              <Link className="text-link" to="/contact">Talk to us <ArrowUpRight size={14} /></Link>
            </div>
          </div>
          <div className="ind-hero-visual"><IndustryScene slug={s.slug} label={`${s.name}: ${s.short}`} /></div>
        </div>
      </section>
      <section className="section ind-challenge">
        <div className="container ind-challenge-grid">
          <div>
            <span className="eyebrow eyebrow-line">Industry Challenge</span>
            <h2>{s.challengeTitle}</h2>
            <p className="ind-lead">{s.challengeBody}</p>
          </div>
          <ChallengeVisual systems={systems} label={`${systems.join(", ")} shown disconnected, then connected through one foundation`} />
        </div>
      </section>
      <section className="section soft" id="opportunities">
        <div className="container">
          <SectionHead label="Transformation Opportunities" title={s.opTitle || s.short} />
          <div className="ind-op-grid">
            {s.opportunities.map((c, i) => (
              <article className="ind-op" key={c.title}>
                <div className="ind-op-art"><Glyph spec={g.ops[i]!} label={c.title} /></div>
                <div><span className="tiny-number">0{i + 1}</span><h3>{c.title}</h3><p>{c.body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead label="Use Cases" title={s.short} />
          <div className="ind-use-grid">
            {s.useCases.map((u, i) => (
              <div className="ind-use" key={u}>
                <Glyph spec={g.uses[i]!} label={u} />
                <h3><span className="tiny-number">0{i + 1}</span>{u}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FinalCta title={s.cta} />
    </div>
  );
}
