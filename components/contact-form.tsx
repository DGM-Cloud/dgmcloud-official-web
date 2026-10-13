'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SITE_CONTACT_EMAIL,
  SITE_WHATSAPP_DISPLAY,
  whatsappUrl,
} from '@/lib/contact-config';
import { useTranslations } from '@/lib/i18n/locale-context';

const PROJECT_OPTIONS = [
  ['transformation', 'contact.optTransformation'],
  ['automation', 'contact.optAutomation'],
  ['custom', 'contact.optCustom'],
  ['software', 'contact.optSoftware'],
  ['integration', 'contact.optIntegration'],
  ['analysis', 'contact.optAnalysis'],
  ['other', 'contact.optOther'],
] as const;

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function ContactForm() {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
    website: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error' | 'invalid'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.project) {
      setStatus('invalid');
      return;
    }
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data: { ok?: boolean } = {};
      try {
        data = (await res.json()) as { ok?: boolean };
      } catch {
        /* cuerpo vacío o no JSON */
      }

      if (!res.ok || !data.ok) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', project: '', message: '', website: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28">
      <div className="section-shell grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="section-kicker mb-3">{t('contact.kicker')}</p>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-lede mt-4">{t('contact.subtitle')}</p>
          <p className="mt-8 text-sm text-muted-foreground">{t('contact.emailHint')}</p>
          <a
            href={`mailto:${SITE_CONTACT_EMAIL}`}
            className="mt-1 inline-block text-base font-semibold text-primary hover:underline"
          >
            {SITE_CONTACT_EMAIL}
          </a>
          <a
            href={whatsappUrl(t('contact.whatsappMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('contact.whatsappAria')}: ${SITE_WHATSAPP_DISPLAY}`}
            className="mt-3 flex w-fit items-center gap-2 text-base font-semibold text-foreground hover:text-[#1da851] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <WhatsappIcon className="size-5 shrink-0 text-[#25d366]" />
            {SITE_WHATSAPP_DISPLAY}
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-border bg-card p-6 md:p-8"
        >
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="contact-name" className="field-label">
              {t('contact.labelName')}
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('contact.placeholderName')}
              required
              autoComplete="name"
              className="field-input"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="field-label">
              {t('contact.labelEmail')}
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('contact.placeholderEmail')}
              required
              autoComplete="email"
              className="field-input"
            />
          </div>

          <div>
            <label htmlFor="contact-project-type" className="field-label">
              {t('contact.labelProject')}
            </label>
            <Select
              value={formData.project || undefined}
              onValueChange={(project) => {
                setFormData((prev) => ({ ...prev, project }));
                setStatus((prev) => (prev === 'invalid' ? 'idle' : prev));
              }}
            >
              <SelectTrigger
                id="contact-project-type"
                aria-invalid={status === 'invalid'}
                aria-describedby={status === 'invalid' ? 'contact-project-error' : undefined}
                className="field-input h-auto min-h-[42px] w-full justify-between shadow-none"
              >
                <SelectValue placeholder={t('contact.selectPlaceholder')} />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={6}
                className="max-h-[min(280px,var(--radix-select-content-available-height))] rounded-lg border border-border bg-popover text-sm text-popover-foreground"
              >
                {PROJECT_OPTIONS.map(([value, labelKey]) => (
                  <SelectItem key={value} value={value} className="cursor-pointer">
                    {t(labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="contact-message" className="field-label">
              {t('contact.labelMessage')}
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('contact.placeholderMessage')}
              rows={5}
              required
              minLength={1}
              className="field-input resize-none"
            />
          </div>

          {status === 'success' && (
            <p role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-800">
              {t('contact.success')}
            </p>
          )}

          {status === 'invalid' && (
            <p
              id="contact-project-error"
              role="alert"
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900"
            >
              {t('contact.invalid')}
            </p>
          )}

          {status === 'error' && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800">
              {t('contact.error')}
            </p>
          )}

          <p className="text-xs leading-relaxed text-muted-foreground">{t('contact.dataNote')}</p>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full disabled:cursor-not-allowed"
          >
            {status === 'loading' ? t('contact.sending') : t('contact.submit')}
          </button>
        </form>
      </div>
    </section>
  );
}
