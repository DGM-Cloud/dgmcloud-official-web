'use client';

import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n/locale-context';
import { SnowField } from '@/components/xmas/snow-field';

const PROBLEMS = ['manual', 'repetitive', 'disconnected', 'specific'] as const;

export function BusinessProblemsSection() {
  const { t } = useTranslations();
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-line bg-card py-16 md:py-28">
      <div className="section-shell">
        <div className="grid gap-8 pb-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:gap-16">
          <div>
            <p className="xm-eyebrow mb-5">{t('problems.kicker')}</p>
            <h2 className="xm-display max-w-3xl text-[clamp(2.3rem,9vw,4.3rem)] text-ink">{t('problems.title')}</h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-7 text-ink-soft md:text-lg md:leading-8">{t('problems.subtitle')}</p>
            <a
              href="#contact"
              className="group mt-6 inline-flex items-center gap-2 border-b border-gold-deep/40 pb-1 text-sm font-semibold text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
            >
              {t('problems.cta')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>

        <div className="xm-hairline" aria-hidden />

        <div className="grid md:grid-cols-2">
          {PROBLEMS.map((id, index) => (
            <motion.article
              key={id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.06 }}
              className={`group relative py-8 transition-colors sm:py-10 md:p-10 md:hover:bg-cream ${
                index % 2 === 0 ? 'md:border-r md:border-line md:pl-4' : 'md:pr-4'
              } ${index < 2 ? 'border-b border-line' : index === 2 ? 'border-b border-line md:border-b-0' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-[2.6rem] font-light italic leading-none text-gold transition-colors group-hover:text-gold-deep">
                  0{index + 1}
                </span>
                <span className="mt-2 rounded-full border border-gold/50 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                  {t(`problems.${id}.solution`)}
                </span>
              </div>
              <h3 className="xm-display mt-7 max-w-lg text-[1.65rem] text-ink sm:mt-9 sm:text-[1.95rem] md:text-[2.15rem]">
                {t(`problems.${id}.title`)}
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-6 text-ink-soft md:text-base md:leading-7">{t(`problems.${id}.body`)}</p>
              <p className="mt-8 flex items-center gap-3 border-t border-line pt-5 text-sm font-semibold text-ink">
                <span className="xm-sparkle size-3 text-gold-deep" aria-hidden />
                {t(`problems.${id}.outcome`)}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="xm-pine-surface relative mt-6 overflow-hidden rounded-[1.5rem] border border-gold/30 px-6 py-8 sm:px-9 md:mt-10 md:px-12 md:py-10">
          <SnowField density={1.1} color="236,217,168" maxParticles={50} />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="xm-display text-[1.5rem] text-cream md:text-[1.9rem]">{t('problems.bannerTitle')}</p>
              <p className="mt-2 text-sm leading-6 text-cream/70 md:text-base">{t('problems.bannerBody')}</p>
            </div>
            <a href="#contact" className="xm-btn xm-btn-gold group shrink-0">
              {t('problems.bannerCta')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
