'use client';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import content from '@/lib/cosmos-content.json';
import { contactSchema } from '@/lib/contact/schema';

type Fields = { fullName: string; email: string; company: string; phone: string; service: string; message: string; website: string };
const empty: Fields = { fullName: '', email: '', company: '', phone: '', service: '', message: '', website: '' };

export function ContactForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const r = contactSchema.safeParse(f);
    if (!r.success) {
      const errs: Partial<Record<keyof Fields, string>> = {};
      r.error.issues.forEach((i) => { const k = i.path[0] as keyof Fields; if (!errs[k]) errs[k] = i.message; });
      setErrors(errs); setState('idle'); return;
    }
    setErrors({}); setState('sending');
    try { const res = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(f) }); if (!res.ok) throw new Error('send failed'); setState('ok'); setMsg('Thank you — your enquiry has been sent. We will be in touch.'); setF(empty); }
    catch { setState('err'); setMsg('We could not send your enquiry. Please check your connection and try again.'); }
  }

  const field = (k: keyof Fields, label: string, opts: { type?: string; required?: boolean; full?: boolean; auto?: string } = {}) => (
    <div className={opts.full ? 'cf-full' : ''}>
      <label htmlFor={`cf-${k}`}>{label}{opts.required ? ' *' : ' (optional)'}</label>
      <input id={`cf-${k}`} type={opts.type ?? 'text'} autoComplete={opts.auto} value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `cf-${k}-err` : undefined} required={opts.required} />
      {errors[k] && <span className="cf-error" id={`cf-${k}-err`}>{errors[k]}</span>}
    </div>
  );

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-label="Contact enquiry form">
      {field('fullName', 'Full name', { required: true, auto: 'name' })}
      {field('email', 'Work email', { type: 'email', required: true, auto: 'email' })}
      {field('company', 'Company name', { auto: 'organization' })}
      {field('phone', 'Phone number', { type: 'tel', auto: 'tel' })}
      <div className="cf-full">
        <label htmlFor="cf-service">Service of interest (optional)</label>
        <select id="cf-service" value={f.service} onChange={set('service')}>
          <option value="">Select a service</option>
          {content.services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
        </select>
      </div>
      <div className="cf-full">
        <label htmlFor="cf-message">Message *</label>
        <textarea id="cf-message" rows={5} value={f.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} required />
        {errors.message && <span className="cf-error" id="cf-message-err">{errors.message}</span>}
      </div>
      <div className="cf-hp" aria-hidden="true"><label htmlFor="cf-website">Website</label><input id="cf-website" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></div>
      {(state === 'ok' || state === 'err') && <p className={`cf-status ${state}`} role="status">{msg}</p>}
      <div className="cf-full"><Button type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send enquiry'}</Button></div>
    </form>
  );
}
