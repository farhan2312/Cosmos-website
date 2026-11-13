'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/cosmos/Blocks";

 
const categories = ["Insights", "Case Studies", "Technology Perspectives", "Research", "Resources"];

export default function ResourcesView() {
  const [active, setActive] = useState(categories[0]!);
  return (
    <section className="section">
      <div className="container">
        <SectionHead label="Resources" title="Resource Hub" />
        <div className="resources-tabs">
          {categories.map((c) => <Button key={c} variant="outline" size="sm" aria-pressed={active === c} onClick={() => setActive(c)}>{c}</Button>)}
        </div>
        <div className="resource-empty">
          <div>
            <span className="eyebrow eyebrow-line">{active}</span>
            <h2>{active}</h2>
            <p>Coming soon.</p>
          </div>
          <div className="resource-lines" aria-hidden="true"><div /><div /><div /></div>
        </div>
      </div>
    </section>
  );
}
