'use client';
import { Link } from "@/lib/nav";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import content from "@/lib/cosmos-content.json";
import { serviceVisuals } from "@/lib/service-visuals";
import { Button } from "@/components/ui/button";
import { FinalCta, SectionHead } from "@/components/cosmos/Blocks";
import { Glyph } from "@/components/cosmos/glyphs/Glyphs";
import { ServiceHero } from "@/components/cosmos/glyphs/ServiceHeroes";
import { TechField } from "@/components/cosmos/TechField";

 
function Process({ stages, specs }: { stages: { title: string; body: string }[]; specs: Parameters<typeof Glyph>[0]["spec"][] }) {
  const [active, setActive] = useState(0);
  const parts = stages.map((s) => { const [n, t] = s.title.split(" — "); return { n: t ? n : "", t: t ?? s.title, body: s.body }; });
  const cur = parts[active]!;
  return (
    <div className="svc-process">
      <div className="svc-process-tabs" role="group" aria-label="Delivery stages">
        {parts.map((p, i) => (
          <button key={p.t} type="button" aria-pressed={active === i} onClick={() => setActive(i)} className="svc-process-tab">
            <span className="tiny-number">{p.n}</span><strong>{p.t}</strong><i aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="svc-process-stage">
        <div className="svc-process-visual" key={active}><Glyph spec={specs[active]!} label={`${cur.t} stage illustration`} /></div>
        <div className="svc-process-copy" aria-live="polite">
          <span className="eyebrow">{cur.n} / {parts.length.toString().padStart(2, "0")}</span>
          <h3>{cur.t}</h3>
          <p>{cur.body}</p>
        </div>
      </div>
    </div>
  );
}

export default function ServiceView({ index }: { index: number }) {
  const s = content.services[index]!;
  const v = serviceVisuals[s.slug]!;
  return (
    <div className="svc-page">
      <section className="svc-hero has-field">
        <TechField variant="network" />
        <div className="container svc-hero-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow eyebrow-line">{s.name}</span>
            <h1>{s.hero}</h1>
            <p>{s.intro}</p>
            <div className="hero-actions">
              <Button asChild><a href="#capabilities">Explore our capabilities <ArrowUpRight /></a></Button>
              <Link className="text-link" to="/contact">Talk to us <ArrowUpRight size={14} /></Link>
            </div>
            {s.support && <p className="support-line">{s.support}</p>}
          </div>
          <div className="svc-hero-visual"><ServiceHero slug={s.slug} label={`${s.name}: how the system connects information, processing and outcomes`} /></div>
        </div>
      </section>

      <section className="section">
        <div className="container svc-problem">
          <div className="svc-problem-lead">
            <span className="eyebrow eyebrow-line">The Problem</span>
            <h2>{s.problemTitle}</h2>
            <p className="problem-intro">{s.problemBody}</p>
            {s.problemClosing && <p className="problem-closing">{s.problemClosing}</p>}
          </div>
          <div className="svc-problem-list">
            {s.problems.map((p, i) => (
              <article className="svc-problem-item" key={p.title}>
                <div className="svc-glyph-frame"><Glyph spec={v.problems[i]!} /></div>
                <div><span className="tiny-number">0{i + 1}</span><h3>{p.title}</h3><p>{p.body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft" id="capabilities">
        <div className="container">
          <SectionHead label="Our Capabilities" title={s.capTitle} />
          <div className="svc-cap-grid">
            {s.capabilities.map((c, i) => (
              <article className="svc-cap-card" key={c.title} tabIndex={0}>
                <div className="svc-glyph-frame"><Glyph spec={v.capabilities[i]!} /></div>
                <span className="tiny-number">0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead label="How We Help" title={s.processTitle} />
          <Process stages={s.stages} specs={v.stages} />
        </div>
      </section>

      <section className="section violet-tint has-field">
        <TechField variant="path" />
        <div className="container">
          <SectionHead label="Impact" title={s.impactTitle} />
          <div className="svc-impact-grid">
            {s.impacts.map((c, i) => (
              <article className="svc-impact" key={c.title}>
                <div className="svc-glyph-frame"><Glyph spec={v.impacts[i]!} /></div>
                <h3>{c.title}</h3><p>{c.body}</p>
              </article>
            ))}
          </div>
          {s.closing && (
            <div className="svc-closing">
              <p className="closing-line">{s.closing}</p>
              <div className="svc-closing-visual"><Glyph spec={v.closing} /></div>
            </div>
          )}
        </div>
      </section>
      <FinalCta title={s.cta} body={s.ctaBody || undefined} />
    </div>
  );
}
