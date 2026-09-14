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
});

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
      subject: `[dgm.cloud] Contacto · ${payload.project} · ${payload.name.slice(0, 72)}`,
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
