'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n/locale-context';

const PROBLEMS = ['manual', 'repetitive', 'disconnected', 'specific'] as const;

export function BusinessProblemsSection() {
  const { t } = useTranslations();
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-[#0a2044]/10 bg-white py-16 md:py-28">
      <div className="section-shell">
        <div className="grid gap-8 border-b border-[#0a2044]/18 pb-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:gap-16">
          <div>
            <p className="section-kicker mb-4">{t('problems.kicker')}</p>
            <h2 className="max-w-3xl text-[clamp(2.25rem,10vw,4.8rem)] font-[560] leading-[0.98] tracking-[-0.05em] text-[#071a38] text-balance sm:tracking-[-0.055em]">
              {t('problems.title')}
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-7 text-[#40536c] md:text-lg">{t('problems.subtitle')}</p>
            <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#075cf6] transition-colors hover:text-[#071a38]">
              {t('problems.cta')} <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {PROBLEMS.map((id, index) => (
            <motion.article
              key={id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.42, delay: reduce ? 0 : index * 0.05 }}
              className={`group py-7 sm:py-9 md:p-10 ${index % 2 === 0 ? 'md:border-r md:border-[#0a2044]/14 md:pl-0' : 'md:pr-0'} ${index < 2 ? 'border-b border-[#0a2044]/14' : index === 2 ? 'border-b border-[#0a2044]/14 md:border-b-0' : ''}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs tracking-[0.16em] text-[#075cf6]">0{index + 1}</span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#075cf6]">{t(`problems.${id}.solution`)}</span>
              </div>
              <h3 className="mt-6 max-w-lg text-[1.4rem] font-semibold leading-tight tracking-[-0.035em] text-[#071a38] sm:mt-8 sm:text-2xl md:text-3xl">{t(`problems.${id}.title`)}</h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-[#52657c] md:text-base md:leading-7">{t(`problems.${id}.body`)}</p>
              <p className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#071a38]">
                <CheckCircle2 className="size-4 text-[#075cf6]" aria-hidden />
                {t(`problems.${id}.outcome`)}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-5 rounded-[1.25rem] bg-[#075cf6] px-6 py-7 text-white sm:flex-row sm:items-center sm:justify-between md:px-9">
          <div>
            <p className="text-lg font-semibold tracking-[-0.025em]">{t('problems.bannerTitle')}</p>
            <p className="mt-1 text-sm text-white/70">{t('problems.bannerBody')}</p>
          </div>
          <a href="#contact" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#075cf6] transition-transform hover:-translate-y-0.5">
            {t('problems.bannerCta')} <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
