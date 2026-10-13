import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

import { SITE_CONTACT_EMAIL } from '@/lib/contact-config';

const contactBodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  project: z.enum([
    'transformation',
    'automation',
    'custom',
    'software',
    'integration',
    'analysis',
    'other',
  ]),
  message: z.string().trim().min(1).max(12000),
  /** Honeypot: oculto para personas, los bots suelen rellenarlo. */
  website: z.string().optional(),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
/** Por instancia: en serverless cada instancia tiene su propio contador. */
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (hits.length >= RATE_LIMIT_MAX) {
    recentSubmissions.set(ip, hits);
    return true;
  }
  hits.push(now);
  recentSubmissions.set(ip, hits);

  if (recentSubmissions.size > 5000) {
    for (const [key, times] of recentSubmissions) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        recentSubmissions.delete(key);
      }
    }
  }
  return false;
}

function clientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    'unknown'
  );
}

function singleLine(text: string): string {
  return text.replace(/[\r\n]+/g, ' ');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildEmailParts(input: z.infer<typeof contactBodySchema>) {
  const { name, email, project, message } = input;
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    project: escapeHtml(project),
    message: escapeHtml(message).replace(/\r?\n/g, '<br/>'),
  };

  const html = `
    <h2>Nuevo mensaje desde dgm.cloud</h2>
    <p><strong>Nombre:</strong> ${safe.name}</p>
    <p><strong>Email:</strong> ${safe.email}</p>
    <p><strong>Tipo de proyecto:</strong> ${safe.project}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${safe.message}</p>
  `.trim();

  const text = [
    'Nuevo mensaje desde dgm.cloud',
    '',
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Tipo de proyecto: ${project}`,
    '',
    'Mensaje:',
    message,
  ].join('\n');

  return { html, text };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[api/contact] Falta RESEND_API_KEY');
    return NextResponse.json({ ok: false, error: 'config' }, { status: 503 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
  }

  const payload = parsed.data;
  if (payload.website) {
    return NextResponse.json({ ok: true, id: null });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || SITE_CONTACT_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    'DGM Cloud <onboarding@resend.dev>';

  const { html, text } = buildEmailParts(payload);

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject: `[dgm.cloud] Contacto · ${payload.project} · ${singleLine(payload.name).slice(0, 72)}`,
      html,
      text,
    });

    if (error) {
      console.error('[api/contact] Resend:', error);
      return NextResponse.json({ ok: false, error: 'send' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (e) {
    console.error('[api/contact]', e);
    return NextResponse.json({ ok: false, error: 'unknown' }, { status: 500 });
  }
}
