import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact/schema';

// Contact enquiries are validated server-side and emailed via Resend (https://resend.com).
// Required env vars: RESEND_API_KEY, CONTACT_TO_EMAIL. Optional: CONTACT_FROM_EMAIL.

const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
  }
  const d = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'COSMOS Website <onboarding@resend.dev>';
  if (!apiKey || !to) {
    console.error('contact: RESEND_API_KEY or CONTACT_TO_EMAIL is not set');
    return NextResponse.json({ error: 'We could not send your enquiry. Please try again.' }, { status: 500 });
  }

  const rows: [string, string][] = [
    ['Name', d.fullName],
    ['Email', d.email],
    ['Company', d.company || '—'],
    ['Phone', d.phone || '—'],
    ['Service', d.service || '—'],
  ];
  const html = `<h2>New enquiry from the COSMOS website</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${esc(v)}</td></tr>`)
    .join('')}</table>
<p><strong>Message</strong></p><p style="white-space:pre-wrap">${esc(d.message)}</p>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${d.message}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map((s) => s.trim()).filter(Boolean),
      reply_to: d.email,
      subject: `Website enquiry: ${d.fullName}${d.company ? ` (${d.company})` : ''}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error('contact: resend failed', res.status, await res.text());
    return NextResponse.json({ error: 'We could not send your enquiry. Please try again.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
