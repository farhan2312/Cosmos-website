'use client';
import { Link } from '@/lib/nav';
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Architecture } from "./Architecture";

export function SectionHead({ label, title, children, link }: { label: string; title: ReactNode; children?: ReactNode; link?: ReactNode }) {
  return (
    <div className="section-head">
      <span className="eyebrow eyebrow-line">{label}</span>
      <div>
        <div className="head-with-link">
          <h2>{title}</h2>
          {link}
        </div>
        {children && <p>{children}</p>}
      </div>
    </div>
  );
}

export function PageHero({ label, title, intro, support, variant, primary }: { label: string; title: string; intro: ReactNode; support?: string; variant: number; primary?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="hero-scene"><Architecture variant={variant} /></div>
      <div className="container">
        <div className="hero-copy reveal">
          <span className="eyebrow eyebrow-line">{label}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <div className="hero-actions">
            {primary}
            <Link className="text-link" to="/contact">Talk to us <ArrowUpRight size={14} /></Link>
          </div>
          {support && <p className="support-line">{support}</p>}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ label = "Start a conversation", title, body, cta = "Talk to COSMOS" }: { label?: string; title: ReactNode; body?: ReactNode; cta?: string }) {
  return (
    <section className="final-cta">
      <div className="container">
        <div>
          <span className="eyebrow eyebrow-line">{label}</span>
          <h2>{title}</h2>
          {body && <p>{body}</p>}
        </div>
        <Button asChild className="cta-button"><Link to="/contact">{cta} <ArrowUpRight /></Link></Button>
      </div>
    </section>
  );
}

export function Stages({ stages }: { stages: { title: string; body: string }[] }) {
  return (
    <div className="process-grid">
      {stages.map((s) => {
        const [n, t] = s.title.split(" — ");
        return (
          <div className="process-stage" key={s.title}>
            <h3><span className="tiny-number">{t ? n : ""}</span>{t ?? s.title}</h3>
            <p>{s.body}</p>
          </div>
        );
      })}
    </div>
  );
}
