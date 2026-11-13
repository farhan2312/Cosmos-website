'use client';
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* Desktop: pinned horizontal track driven by native vertical scroll (no wheel hijacking).
   Small screens, touch-only devices and short viewports keep the natural vertical page. */
// Thresholds are in CSS px, which shrink as browser zoom grows: the old 1100x640 gate meant typical
// laptops/preview panes at 100% zoom only qualified when zoomed out to ~50%. Panels auto-fit their height.
const QUERY = '(min-width: 768px) and (min-height: 500px) and (hover: hover) and (pointer: fine)';

export function HorizontalJourney({ children, labels, widths }: { children: ReactNode; labels: string[]; widths: number[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const offsets = useRef<number[]>([]);
  const dist = useRef(0);
  const [on, setOn] = useState(false);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const update = () => setOn(mq.matches);
    update(); mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const goTo = useCallback((i: number) => {
    const o = outer.current; if (!o) return;
    const idx = Math.max(0, Math.min(items.length - 1, i));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 0;
    const top = o.getBoundingClientRect().top + window.scrollY - header + Math.min(dist.current, offsets.current[idx] ?? 0);
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  }, [items.length]);

  useEffect(() => {
    const o = outer.current, t = track.current, st = sticky.current;
    if (!o || !t || !st) return;
    const panels = Array.from(t.querySelectorAll<HTMLElement>(':scope > .h-panel'));
    if (!on) { o.style.height = ''; t.style.transform = ''; panels.forEach(p => { const f = p.firstElementChild as HTMLElement; f.style.zoom = ''; }); return; }
    let raf = 0;
    const onScroll = () => {
      const header = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 0;
      const x = Math.min(dist.current, Math.max(0, header - o.getBoundingClientRect().top));
      t.style.transform = `translate3d(${-x}px,0,0)`;
      setProgress(dist.current ? x / dist.current : 0);
      let a = 0; offsets.current.forEach((off, i) => { if (off <= x + window.innerWidth * 0.45) a = i; });
      activeRef.current = a; setActive(a);
    };
    const measure = () => {
      const header = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 0;
      o.style.setProperty('--journey-header', `${header}px`);
      o.style.setProperty('--journey-height', `${window.innerHeight - header}px`);
      const vh = st.clientHeight || window.innerHeight;
      panels.forEach(p => {
        const f = p.firstElementChild as HTMLElement;
        // Keep typography at its intended size; short frames scroll locally instead of shrinking content.
        f.style.zoom = '';
      });
      dist.current = Math.max(0, t.scrollWidth - window.innerWidth);
      offsets.current = panels.map(p => p.offsetLeft);
      o.style.height = `${dist.current + vh}px`;
      onScroll();
    };
    const tick = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(onScroll); };
    const inRange = () => { const header = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 0; const top = o.getBoundingClientRect().top - header; return top <= 1 && top > -dist.current - 1; };
    const onKey = (e: KeyboardEvent) => {
      if (!inRange() || e.defaultPrevented || e.altKey || e.metaKey || e.ctrlKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(activeRef.current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(activeRef.current - 1); }
    };
    // Horizontal trackpad swipes map onto the same scroll distance; vertical wheel stays native.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || !inRange()) return;
      e.preventDefault(); window.scrollBy({ top: e.deltaX });
    };
    // Keep keyboard focus visible: tabbing into an off-screen panel brings that panel into view.
    const onFocus = (e: FocusEvent) => {
      st.scrollLeft = 0;
      const panel = (e.target as HTMLElement).closest<HTMLElement>('.h-panel');
      if (!panel) return;
      const i = panels.indexOf(panel);
      const header = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 0;
      const x = Math.min(dist.current, Math.max(0, header - o.getBoundingClientRect().top));
      const r = (e.target as HTMLElement).getBoundingClientRect();
      if (r.left < 0 || r.right > window.innerWidth) window.scrollTo({ top: o.getBoundingClientRect().top + window.scrollY - header + Math.min(dist.current, offsets.current[i] ?? x) });
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    const late = window.setTimeout(measure, 600);
    const ro = new ResizeObserver(measure); panels.forEach(p => ro.observe(p.firstElementChild as HTMLElement));
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('keydown', onKey);
    st.addEventListener('wheel', onWheel, { passive: false });
    st.addEventListener('focusin', onFocus);
    return () => { cancelAnimationFrame(raf); clearTimeout(late); ro.disconnect(); window.removeEventListener('scroll', tick); window.removeEventListener('resize', measure); window.removeEventListener('keydown', onKey); st.removeEventListener('wheel', onWheel); st.removeEventListener('focusin', onFocus); };
  }, [on, goTo]);

  return (
    <div ref={outer} className={`h-journey ${on ? 'is-on' : ''}`}>
      <div ref={sticky} className="h-sticky">
        <div ref={track} className="h-track">
          {items.map((child, i) => (
            <div key={i} className="h-panel" style={{ ['--pw' as string]: `${widths[i] ?? 100}vw` }} aria-label={labels[i]} role="group">
              <div className="h-fit">{child}</div>
            </div>
          ))}
        </div>
        {on && (
          <nav className="h-progress" aria-label="Landing page sections">
            <Button2 label="Previous section" onClick={() => goTo(active - 1)} disabled={active === 0}><ArrowLeft size={15} /></Button2>
            <span className="h-count"><strong>{String(active + 1).padStart(2, '0')}</strong> / {String(items.length).padStart(2, '0')}</span>
            <span className="h-name">{labels[active]}</span>
            <div className="h-dots">
              {labels.map((l, i) => <Button key={l} variant="ghost" size="icon" aria-label={`Go to ${l}`} aria-current={active === i ? 'step' : undefined} onClick={() => goTo(i)} />)}
              <span className="h-bar" style={{ transform: `scaleX(${progress})` }} />
            </div>
            <Button2 label="Next section" onClick={() => goTo(active + 1)} disabled={active === items.length - 1}><ArrowRight size={15} /></Button2>
          </nav>
        )}
      </div>
    </div>
  );
}

function Button2({ children, label, onClick, disabled }: { children: ReactNode; label: string; onClick: () => void; disabled?: boolean }) {
  return <Button variant="outline" size="icon" className="h-arrow" aria-label={label} title={label} onClick={onClick} disabled={disabled}>{children}</Button>;
}
