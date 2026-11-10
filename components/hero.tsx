'use client';

import { ArrowDownRight, ArrowRight, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n/locale-context';

const CAPABILITY_KEYS = ['capability1', 'capability2', 'capability3'] as const;

export function Hero() {
  const { t } = useTranslations();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-[#0a2044]/10 bg-white text-[#071a38]">
      <div className="hero-shell grid gap-9 py-10 sm:gap-12 sm:py-14 md:py-18 lg:min-h-[calc(100svh-4.75rem)] lg:items-center lg:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="flex max-w-[32rem] items-center gap-2.5 text-[0.62rem] font-semibold uppercase leading-5 tracking-[0.15em] text-[#075cf6] sm:gap-3 sm:text-[0.68rem] sm:tracking-[0.18em]">
            <span className="size-2 rounded-full bg-[#075cf6]" aria-hidden />
            {t('hero.eyebrow')}
          </p>

          <h1 className="mt-5 max-w-[11.5ch] text-[clamp(2.75rem,12.5vw,4.2rem)] font-[560] leading-[0.94] tracking-[-0.06em] text-balance sm:mt-7 lg:max-w-[12ch] lg:text-[clamp(5rem,6.5vw,7.4rem)] lg:leading-[0.91] lg:tracking-[-0.07em]">
            {t('hero.titleLead')}{' '}
            <span className="text-[#075cf6]">{t('hero.titleFinish')}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-[0.95rem] leading-6 text-[#40536c] sm:mt-7 sm:text-base sm:leading-7 md:text-lg md:leading-8">{t('hero.subtitle')}</p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <a href="#contact" className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#075cf6] px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#064dcc] hover:shadow-[0_14px_35px_rgba(7,92,246,.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075cf6] focus-visible:ring-offset-2 sm:min-h-13 sm:w-auto sm:px-7">
              {t('hero.ctaPrimary')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a href="#portfolio" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#0a2044]/20 bg-white px-5 text-sm font-semibold text-[#071a38] transition-colors hover:border-[#075cf6] hover:text-[#075cf6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075cf6] sm:min-h-13 sm:w-auto sm:px-7">
              {t('hero.ctaProjects')}
            </a>
          </div>

          <ul className="mt-7 grid gap-3 border-t border-[#0a2044]/12 pt-5 min-[430px]:flex min-[430px]:flex-wrap min-[430px]:gap-x-6 sm:mt-9 sm:pt-6" aria-label={t('hero.capabilitiesLabel')}>
            {CAPABILITY_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#40536c]">
                <Check className="size-3.5 text-[#075cf6]" aria-hidden />
                {t(`hero.${key}`)}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#0a2044]/12 pt-5">
          <p className="font-mono text-[0.59rem] uppercase tracking-[0.18em] text-[#60728a]">DGM Cloud · Lima, Perú</p>
          <a href="#portfolio" className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#075cf6] transition-colors hover:text-[#071a38]">
            {t('hero.scrollHint')}
            <ArrowDownRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
