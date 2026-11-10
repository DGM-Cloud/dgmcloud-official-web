'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n/locale-context';
import { Garland } from '@/components/xmas/garland';

const SERVICES = [
  { id: 'digital', capabilities: ['software', 'consulting'] },
  { id: 'automation', capabilities: ['integration'] },
  { id: 'custom', capabilities: ['software', 'integration'] },
] as const;

export function ServicesSection() {
  const { t } = useTranslations();
  const reduce = useReducedMotion();

  return (
    <section id="services" className="relative isolate scroll-mt-24 overflow-hidden border-b border-line bg-cream-2 py-16 md:py-28">
      <Garland tone="light" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-9 w-full opacity-70 md:h-12" />

      <div className="section-shell">
        <div className="grid gap-8 pt-4 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
          <div>
            <p className="xm-eyebrow mb-5">{t('services.kicker')}</p>
            <h2 className="xm-display max-w-md text-[clamp(2.3rem,9vw,4.4rem)] text-ink">{t('services.title')}</h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-7 text-ink-soft md:text-lg md:leading-8">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="mt-12 border-t border-gold-deep/30 md:mt-20">
          {SERVICES.map(({ id, capabilities }, index) => (
            <motion.article
              key={id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.06 }}
              className="group relative grid grid-cols-[1fr_auto] gap-x-4 gap-y-4 border-b border-gold-deep/30 py-8 transition-colors md:grid-cols-[5rem_minmax(13rem,.85fr)_minmax(18rem,1.15fr)_auto] md:items-start md:gap-8 md:py-12 md:hover:bg-cream/70"
            >
              <span className="font-display text-[2.4rem] font-light italic leading-none text-gold-deep md:text-5xl">0{index + 1}</span>
              <h3 className="xm-display col-span-2 text-[1.7rem] text-ink md:col-span-1 md:text-[2.1rem]">
                {t(`expertise.${id}.title`)}
              </h3>
              <div className="col-span-2 md:col-span-1">
                <p className="max-w-xl text-sm leading-6 text-ink-soft md:text-base md:leading-7">
                  {t(`expertise.${id}.body`)}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="rounded-full border border-gold-deep/30 bg-card px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-soft"
                    >
                      {t(`capabilities.${capability}.title`)}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#contact"
                aria-label={`${t(`expertise.${id}.title`)} — ${t('nav.cta')}`}
                className="col-start-2 row-start-1 flex size-12 items-center justify-center rounded-full border border-gold-deep/40 text-ink transition-all group-hover:border-night group-hover:bg-night group-hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep md:col-start-auto md:row-start-auto"
              >
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
