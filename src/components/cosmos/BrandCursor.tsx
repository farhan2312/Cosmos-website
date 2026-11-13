'use client';
import { useEffect, useRef } from 'react';

/** A pointer accent, not a replacement for the native cursor. */
export function BrandCursor() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = marker.current;
    if (!el) return;
    const query = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    const hide = () => { el.dataset['visible'] = 'false'; };
    const move = (event: PointerEvent) => {
      if (!query.matches || event.pointerType !== 'mouse') { hide(); return; }
      const target = event.target;
      if (target instanceof Element && target.closest('input, textarea, [contenteditable="true"]')) { hide(); return; }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${event.clientX + 10}px, ${event.clientY + 10}px, 0)`;
        el.dataset['visible'] = 'true';
      });
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    query.addEventListener('change', hide);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      query.removeEventListener('change', hide);
    };
  }, []);
  return <span ref={marker} className="brand-cursor" aria-hidden="true"><i /><i /><i /><i /><i /></span>;
}