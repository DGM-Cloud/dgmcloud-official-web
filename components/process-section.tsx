'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileSearch, Lightbulb, PenTool, Rocket, Route } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/locale-context';

const STEPS = [
  { id: 'p1', icon: Lightbulb },
  { id: 'p2', icon: FileSearch },
  { id: 'p3', icon: Route },
  { id: 'p4', icon: PenTool },
  { id: 'p5', icon: Rocket },
] as const;

export function ProcessSection() {
  const { t } = useTranslations();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = STEPS[active] ?? STEPS[0];
  const CurrentIcon = current.icon;

  return (
    <section id="about" className="scroll-mt-24 overflow-hidden border-b border-[#0a2044]/10 bg-[#071a38] py-20 text-white md:py-28">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-[#6eb4ff]">{t('process.kicker')}</p>
            <h2 className="max-w-2xl text-[clamp(2.7rem,5vw,5rem)] font-[560] leading-[0.94] tracking-[-0.055em] text-balance">{t('process.title')}</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-blue-100/60 md:text-lg">{t('process.subtitle')}</p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.035] lg:grid-cols-[.72fr_1.28fr] md:mt-18">
          <div className="border-b border-white/12 lg:border-b-0 lg:border-r" role="tablist" aria-label={t('process.kicker')}>
            {STEPS.map((step, index) => {
              const selected = index === active;
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActive(index)}
                  role="tab"
                  id={`process-tab-${step.id}`}
                  aria-selected={selected}
                  aria-controls="process-stage-panel"
                  className={`group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-white/10 px-5 py-4 text-left transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#69b5ff] md:px-6 md:py-5 ${selected ? 'bg-white text-[#071a38]' : 'text-white/58 hover:bg-white/[0.05] hover:text-white'}`}
                >
                  <span className={`flex size-9 items-center justify-center rounded-full ${selected ? 'bg-[#075cf6] text-white' : 'border border-white/12 text-[#69b5ff]'}`}>
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold">{t(`process.${step.id}.title`)}</span>
                  <span className={`font-mono text-[0.62rem] ${selected ? 'text-[#075cf6]' : 'text-white/30'}`}>0{index + 1}</span>
                </button>
              );
            })}
          </div>

          <div id="process-stage-panel" role="tabpanel" aria-labelledby={`process-tab-${current.id}`} className="relative min-h-[24rem] overflow-hidden p-7 sm:p-10 md:min-h-[28rem] md:p-12">
            <div className="absolute -right-24 -top-24 size-80 rounded-full border border-[#1684ff]/20" aria-hidden />
            <div className="absolute -right-8 -top-8 size-48 rounded-full border border-[#1684ff]/30" aria-hidden />
            <div className="absolute bottom-8 right-8 flex items-center gap-2" aria-hidden>
              {STEPS.map((step, index) => (
                <span key={step.id} className={`h-1 rounded-full transition-all ${index <= active ? 'w-7 bg-[#3b9cff]' : 'w-3 bg-white/14'}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex h-full flex-col"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-[#075cf6] text-white shadow-[0_16px_40px_rgba(7,92,246,.35)]">
                  <CurrentIcon className="size-6" aria-hidden />
                </div>
                <p className="mt-12 font-mono text-xs uppercase tracking-[0.16em] text-[#69b5ff]">{t('process.activeLabel')} 0{active + 1}</p>
                <h3 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">{t(`process.${current.id}.title`)}</h3>
                <p className="mt-5 max-w-lg text-base leading-7 text-blue-100/62 md:text-lg md:leading-8">{t(`process.${current.id}.body`)}</p>
                <button
                  type="button"
                  onClick={() => setActive((active + 1) % STEPS.length)}
                  className="mt-auto flex w-fit items-center gap-2 pt-10 text-sm font-semibold text-[#77bbff] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#69b5ff]"
                >
                  {active === STEPS.length - 1 ? t('process.restart') : t('process.next')}
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
