'use client';

import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n/locale-context';
import { ChristmasTree } from '@/components/xmas/christmas-tree';
import { Garland } from '@/components/xmas/garland';
import { Ornament } from '@/components/xmas/ornament';
import { SnowField } from '@/components/xmas/snow-field';

const CAPABILITY_KEYS = ['capability1', 'capability2', 'capability3'] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useTranslations();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="xm-night-surface overflow-hidden border-b border-gold/25">
      <SnowField />
      <Garland className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-12 w-full opacity-90 sm:h-14" />

      {/* Adornos colgantes: solo en pantallas amplias, para no competir con el texto. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto hidden h-full max-w-7xl lg:block" aria-hidden>
        <Ornament tone="gold" size={34} thread={70} className="xm-sway absolute left-[56%] top-0 opacity-90" style={{ animationDelay: '-1s' }} />
        <Ornament tone="cream" size={26} thread={34} className="xm-sway absolute left-[60%] top-0 opacity-80" style={{ animationDelay: '-3s' }} />
        <Ornament tone="pine" size={40} thread={104} className="xm-sway absolute left-[93%] top-0 opacity-90" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="hero-shell grid gap-10 py-14 sm:py-20 lg:min-h-[calc(100svh-6.75rem)] lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:gap-10 lg:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="relative"
        >
          <p className="xm-eyebrow xm-eyebrow-light max-w-[34rem]">{t('hero.eyebrow')}</p>

          <h1 className="xm-display mt-6 text-[clamp(2.9rem,10.5vw,4.4rem)] text-cream sm:mt-8 lg:text-[clamp(4.2rem,6.4vw,6.9rem)] lg:leading-[0.98]">
            {t('hero.titleLead')}{' '}
            <em className="xm-gold-text pr-[0.06em]">{t('hero.titleFinish')}</em>
          </h1>

          <p className="mt-6 max-w-xl text-[0.98rem] leading-7 text-cream/72 sm:mt-8 md:text-lg md:leading-8">{t('hero.subtitle')}</p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <a href="#contact" className="xm-btn xm-btn-gold group w-full sm:w-auto">
              {t('hero.ctaPrimary')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a href="#portfolio" className="xm-btn xm-btn-outline-light w-full sm:w-auto">
              {t('hero.ctaProjects')}
            </a>
          </div>

          <ul
            className="mt-10 grid gap-3 border-t border-gold/25 pt-6 min-[430px]:flex min-[430px]:flex-wrap min-[430px]:gap-x-8 sm:mt-12"
            aria-label={t('hero.capabilitiesLabel')}
          >
            {CAPABILITY_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream/70">
                <span className="xm-sparkle size-2.5 text-gold" aria-hidden />
                {t(`hero.${key}`)}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: reduce ? 0 : 0.15, ease }}
          className="relative hidden justify-self-center lg:block"
          aria-hidden
        >
          <ChristmasTree className="w-[min(100%,29rem)] drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]" />
        </motion.div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gold/25 pt-5 lg:col-span-2">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cream/55">DGM Cloud · Lima, Perú</p>
          <a
            href="#portfolio"
            className="flex items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-gold-light transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {t('hero.scrollHint')}
            <ArrowDownRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
