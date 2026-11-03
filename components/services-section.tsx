'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n/locale-context';

const SERVICES = [
  { id: 'digital', capabilities: ['software', 'consulting'] },
  { id: 'automation', capabilities: ['integration'] },
  { id: 'custom', capabilities: ['software', 'integration'] },
] as const;

export function ServicesSection() {
  const { t } = useTranslations();
  const reduce = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-24 border-b border-[#0a2044]/15 bg-[#f3f6fa] py-16 md:py-28">
      <div className="section-shell">
        <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:gap-14">
          <div>
            <p className="section-kicker mb-4">{t('services.kicker')}</p>
            <h2 className="max-w-md text-[clamp(2.25rem,10vw,5rem)] font-[540] leading-[0.96] tracking-[-0.055em] text-[#071a38] text-balance sm:leading-[0.92] sm:tracking-[-0.065em]">
              {t('services.title')}
            </h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-7 text-[#29415f]/75 md:text-lg md:leading-8">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="mt-10 border-t border-[#0a2044]/25 sm:mt-14 md:mt-20">
          {SERVICES.map(({ id, capabilities }, index) => (
            <motion.article
              key={id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.45, delay: reduce ? 0 : index * 0.05 }}
              className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-4 border-b border-[#0a2044]/25 py-7 md:grid-cols-[4rem_minmax(13rem,.85fr)_minmax(18rem,1.15fr)_auto] md:items-start md:gap-8 md:py-10"
            >
              <span className="col-span-1 font-mono text-xs tracking-[0.15em] text-[#075cf6] md:col-span-1">0{index + 1}</span>
              <h3 className="col-span-2 text-[1.45rem] font-semibold tracking-[-0.04em] text-[#071a38] md:col-span-1 md:text-3xl">
                {t(`expertise.${id}.title`)}
              </h3>
              <div className="col-span-2 md:col-span-1">
                <p className="max-w-xl text-sm leading-6 text-[#29415f]/75 md:text-base md:leading-7">
                  {t(`expertise.${id}.body`)}
                </p>
                <p className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#51667e]">
                  {capabilities.map((capability) => t(`capabilities.${capability}.title`)).join(' · ')}
                </p>
              </div>
              <a href="#contact" aria-label={`${t(`expertise.${id}.title`)} — ${t('nav.cta')}`} className="col-start-2 row-start-1 flex size-11 items-center justify-center rounded-full border border-[#0a2044]/25 text-[#071a38] transition-all group-hover:border-[#075cf6] group-hover:bg-[#075cf6] group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075cf6] md:col-start-auto md:row-start-auto">
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
