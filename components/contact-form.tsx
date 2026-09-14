'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SITE_CONTACT_EMAIL } from '@/lib/contact-config';
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

export function ContactForm() {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
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
      setFormData({ name: '', email: '', project: '', message: '' });
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
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-border bg-card p-6 md:p-8"
        >
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
