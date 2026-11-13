import type { GlyphName, GlyphSpec } from '@/components/cosmos/glyphs/Glyphs';

/* Concept → illustration for industry opportunities and use cases. Keyed by the approved
   titles; the industry index varies each generator so repeated concepts differ per page. */
const rules: [RegExp, GlyphName][] = [
  [/maintenance|equipment monitoring/i, 'gauge'], [/twin/i, 'mirror'], [/quality|inspection/i, 'radar'],
  [/regulat/i, 'mirror'], [/fraud/i, 'shield'], [/risk|asset monitoring|network monitoring/i, 'radar'],
  [/document/i, 'docScan'], [/forecast|yield|demand/i, 'bars'], [/route|shipment|supply chain|visibility/i, 'paths'],
  [/warehouse|crop|precision/i, 'gridHighlight'], [/inventory/i, 'matrix'], [/fleet|field/i, 'branch'],
  [/recommend|grid|network optim|network intel/i, 'graph'], [/personal/i, 'diverge'], [/customer|patient|citizen/i, 'cluster'],
  [/irrigation|connected|integration|infrastructure/i, 'bus'], [/weather/i, 'rings'], [/research/i, 'iterate'],
  [/resource/i, 'gauge'], [/case|production/i, 'pipeline'], [/automation|workflow/i, 'chain'], [/store|service automation/i, 'loop'],
  [/platform|digital|modern/i, 'layers'], [/analytics|intelligence/i, 'scatter'], [/predict/i, 'bars'], [/process/i, 'chain'], [/operation/i, 'lanes'],
];
export function industryGlyph(title: string, industry: number, slot: number): GlyphSpec {
  const name = rules.find(([r]) => r.test(title))?.[1] ?? 'converge';
  return [name, { v: industry + slot, n: 3 + ((industry + slot) % 3), alt: (industry + slot) % 2 === 1 }];
}

/* Systems named in each challenge, drawn disconnected then connected. */
export const challengeSystems: Record<string, string[]> = {
  manufacturing: ['Machines', 'Quality', 'Planning', 'ERP'],
  'supply-chain-logistics': ['Warehouses', 'Transport', 'Inventory', 'Suppliers'],
  'financial-services': ['Transactions', 'Risk', 'Customers', 'Compliance'],
  'retail-consumer': ['Online', 'Stores', 'Inventory', 'Fulfilment'],
  'energy-utilities': ['Generation', 'Grid', 'Assets', 'Field teams'],
  'healthcare-life-sciences': ['Clinical', 'Laboratory', 'Operations', 'Research'],
  'government-public-sector': ['Departments', 'Records', 'Services', 'Casework'],
  telecommunications: ['Network', 'Devices', 'Customers', 'Field ops'],
  agriculture: ['Fields', 'Weather', 'Machinery', 'Supply'],
};

/* All visuals for one industry page, guaranteeing no two concepts on the page share a generator. */
const spare: GlyphName[] = ['converge', 'transform', 'orbit', 'iterate', 'lanes', 'matrix', 'loop', 'branch', 'graph', 'radar', 'layers', 'pipeline', 'diverge', 'rings', 'cluster', 'bus', 'scatter', 'bars', 'gauge', 'paths', 'chain', 'mirror'];
export function pageGlyphs(opportunities: string[], useCases: string[], industry: number) {
  const used = new Set<GlyphName>();
  const pick = (title: string, slot: number): GlyphSpec => {
    const first = industryGlyph(title, industry, slot);
    const name = used.has(first[0]) ? spare.find(n => !used.has(n)) ?? first[0] : first[0];
    used.add(name);
    return first[1] ? [name, first[1]] : [name];
  };
  return { ops: opportunities.map((t, i) => pick(t, i)), uses: useCases.map((t, i) => pick(t, i + 4)) };
}
