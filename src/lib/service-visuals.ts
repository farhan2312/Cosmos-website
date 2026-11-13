import type { GlyphSpec } from '@/components/cosmos/glyphs/Glyphs';

/* Concept → illustration mapping for each service page, in the same order as the approved copy. */
type Visuals = { problems: GlyphSpec[]; capabilities: GlyphSpec[]; stages: GlyphSpec[]; impacts: GlyphSpec[]; closing: GlyphSpec };

export const serviceVisuals: Record<string, Visuals> = {
  'ai-intelligent-systems': {
    problems: [['silos'], ['pipeline', { n: 5, alt: true }], ['cluster']],
    capabilities: [['orbit', { n: 5 }], ['transform'], ['branch', { v: 1 }], ['scatter'], ['graph'], ['matrix']],
    stages: [['gridHighlight'], ['iterate'], ['chain', { n: 4 }], ['rings']],
    impacts: [['converge', { n: 5, v: 1 }], ['paths'], ['docScan'], ['lanes', { n: 4 }], ['diverge', { n: 5 }]],
    closing: ['bus', { n: 7 }],
  },
  'data-decision-intelligence': {
    problems: [['silos', { n: 4 }], ['converge', { n: 7 }], ['paths']],
    capabilities: [['pipeline', { n: 5 }], ['gauge'], ['cluster'], ['bars', { alt: true }], ['gridHighlight'], ['branch', { v: 2 }]],
    stages: [['bus', { n: 5 }], ['layers', { n: 3 }], ['diverge', { n: 4 }], ['loop']],
    impacts: [['radar'], ['converge', { n: 4, v: 1 }], ['scatter'], ['orbit', { n: 6 }], ['tangle']],
    closing: ['layers', { n: 4 }],
  },
  'intelligent-automation': {
    problems: [['loop'], ['silos'], ['tangle']],
    capabilities: [['pipeline', { n: 4 }], ['lanes', { n: 3 }], ['branch', { v: 0 }], ['matrix'], ['docScan'], ['orbit', { n: 4 }]],
    stages: [['gridHighlight'], ['paths'], ['pipeline', { n: 5, alt: true }], ['diverge', { n: 6 }]],
    impacts: [['converge', { n: 5, v: 2 }], ['shield'], ['gauge'], ['chain', { n: 5 }], ['loop', { alt: true }]],
    closing: ['branch', { v: 2 }],
  },
  'enterprise-automation': {
    problems: [['silos', { n: 4 }], ['tangle'], ['radar']],
    capabilities: [['bus', { n: 5 }], ['pipeline', { n: 3 }], ['lanes', { n: 5 }], ['mirror'], ['diverge', { n: 4 }], ['layers', { n: 3 }]],
    stages: [['gridHighlight'], ['chain', { n: 3 }], ['branch', { v: 1 }], ['rings']],
    impacts: [['orbit', { n: 6 }], ['paths'], ['gauge'], ['converge', { n: 6 }], ['bars']],
    closing: ['bus', { n: 6 }],
  },
  'cloud-digital-infrastructure': {
    problems: [['monolith'], ['cluster'], ['bars']],
    capabilities: [['mirror'], ['layers', { n: 3 }], ['iterate', { n: 3 }], ['shield'], ['loop', { alt: true }], ['gauge']],
    stages: [['radar'], ['gridHighlight'], ['monolith'], ['converge', { n: 4, v: 1 }]],
    impacts: [['rings'], ['lanes', { n: 4 }], ['layers', { n: 4 }], ['diverge', { n: 5 }], ['tangle']],
    closing: ['layers', { n: 3 }],
  },
  'emerging-technology': {
    problems: [['radar'], ['converge', { n: 5, v: 1 }], ['pipeline', { n: 4 }]],
    capabilities: [['orbit', { n: 7 }], ['mirror'], ['chain', { n: 4 }], ['layers', { n: 3 }], ['lanes', { n: 5 }], ['iterate', { n: 4 }]],
    stages: [['gridHighlight'], ['gauge'], ['branch', { v: 0 }], ['rings']],
    impacts: [['diverge', { n: 6 }], ['transform'], ['bus', { n: 5 }], ['paths'], ['converge', { n: 3, v: 2 }]],
    closing: ['iterate', { n: 5 }],
  },
};
