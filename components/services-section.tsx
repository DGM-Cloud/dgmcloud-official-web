'use client';

import { Code2, GitBranch, RefreshCw, Search, Workflow, Wrench } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/locale-context';

const PILLARS = [
  { id: 'digital' as const, icon: RefreshCw },
  { id: 'automation' as const, icon: Workflow },
  { id: 'custom' as const, icon: Wrench },
] as const;

const CAPABILITIES = [
  { id: 'software' as const, icon: Code2 },
  { id: 'integration' as const, icon: GitBranch },
  { id: 'consulting' as const, icon: Search },
] as const;

export function ServicesSection() {
  const { t } = useTranslations();

  return (
    <section id="services" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-10 max-w-2xl md:mb-12">
          <p className="section-kicker mb-3">{t('services.kicker')}</p>
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-lede mt-4">{t('services.subtitle')}</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {PILLARS.map(({ id, icon: Icon }, i) => (
              <article
                key={id}
                className={[
                  'flex h-full flex-col p-7 md:p-8',
                  i < PILLARS.length - 1 ? 'border-b border-border md:border-b-0 md:border-r' : '',
                ].join(' ')}
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <span className="font-mono text-xs font-semibold text-primary">
                    {t(`expertise.${id}.label`)}
                  </span>
                </div>
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-foreground">
                  {t(`expertise.${id}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`expertise.${id}.body`)}
                </p>
              </article>
            ))}
          </div>

          <div className="border-t border-border bg-muted/70">
            <div className="border-b border-border px-7 py-5 md:px-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t('services.howKicker')}
              </p>
              <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {t('services.howLabel')}
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-3">
              {CAPABILITIES.map(({ id, icon: Icon }, i) => (
                <li
                  key={id}
                  className={[
                    'flex gap-4 px-7 py-6 md:px-8',
                    i < CAPABILITIES.length - 1
                      ? 'border-b border-border md:border-b-0 md:border-r'
                      : '',
                  ].join(' ')}
                >
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground">
                    <Icon className="size-3.5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-medium tracking-tight text-foreground">
                      {t(`capabilities.${id}.title`)}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {t(`capabilities.${id}.body`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
