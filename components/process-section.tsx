'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileSearch, Lightbulb, PenTool, Rocket, Route } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/locale-context';
import { SnowField } from '@/components/xmas/snow-field';

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
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = STEPS[active] ?? STEPS[0];
  const CurrentIcon = current.icon;

  useEffect(() => {
    const tabList = tabListRef.current;
    const activeTab = tabRefs.current[active];

    if (!tabList || !activeTab || window.matchMedia('(min-width: 1024px)').matches) return;

    const centeredLeft = activeTab.offsetLeft - (tabList.clientWidth - activeTab.offsetWidth) / 2;
    const targetLeft = Math.min(Math.max(centeredLeft, 0), tabList.scrollWidth - tabList.clientWidth);

    tabList.scrollTo({
      left: targetLeft,
      behavior: reduce ? 'auto' : 'smooth',
    });
  }, [active, reduce]);

  return (
    <section id="about" className="xm-night-surface scroll-mt-24 overflow-hidden border-b border-gold/25 py-16 md:py-28">
      <SnowField density={0.55} maxParticles={55} />
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end lg:gap-16">
          <div>
            <p className="xm-eyebrow xm-eyebrow-light mb-5">{t('process.kicker')}</p>
            <h2 className="xm-display max-w-2xl text-[clamp(2.3rem,9vw,4.6rem)] text-cream">{t('process.title')}</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-cream/65 md:text-lg md:leading-8">{t('process.subtitle')}</p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[1.25rem] border border-gold/25 bg-night/40 backdrop-blur-sm sm:mt-14 sm:rounded-[1.5rem] lg:grid-cols-[.72fr_1.28fr] md:mt-16">
          <div ref={tabListRef} className="process-tabs border-b border-gold/20 lg:border-b-0 lg:border-r" role="tablist" aria-label={t('process.kicker')}>
            {STEPS.map((step, index) => {
              const selected = index === active;
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  onClick={() => setActive(index)}
                  role="tab"
                  id={`process-tab-${step.id}`}
                  aria-selected={selected}
                  aria-controls="process-stage-panel"
                  className={`process-tab group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-gold/15 px-5 py-4 text-left transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold md:px-6 md:py-5 ${selected ? 'bg-cream text-night' : 'text-cream/60 hover:bg-white/[0.05] hover:text-cream'}`}
                >
                  <span className={`flex size-9 items-center justify-center rounded-full ${selected ? 'bg-night text-gold-light' : 'border border-gold/30 text-gold-light'}`}>
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold">{t(`process.${step.id}.title`)}</span>
                  <span className={`font-display text-lg font-light italic ${selected ? 'text-gold-deep' : 'text-cream/35'}`}>0{index + 1}</span>
                </button>
              );
            })}
          </div>

          <div id="process-stage-panel" role="tabpanel" aria-labelledby={`process-tab-${current.id}`} className="process-stage-panel relative min-h-[21rem] overflow-hidden p-6 sm:min-h-[24rem] sm:p-10 md:min-h-[28rem] md:p-12">
            <div className="absolute -right-24 -top-24 size-80 rounded-full border border-gold/20" aria-hidden />
            <div className="absolute -right-8 -top-8 size-48 rounded-full border border-gold/30" aria-hidden />
            <div className="absolute bottom-8 right-8 flex items-center gap-2" aria-hidden>
              {STEPS.map((step, index) => (
                <span key={step.id} className={`h-1 rounded-full transition-all ${index <= active ? 'w-7 bg-gold' : 'w-3 bg-white/14'}`} />
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
                <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#efdca6] to-[#cfa95c] text-night shadow-[0_16px_40px_rgba(201,164,92,.3)]">
                  <CurrentIcon className="size-6" aria-hidden />
                </div>
                <p className="mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-light sm:mt-12">
                  {t('process.activeLabel')} 0{active + 1}
                </p>
                <h3 className="xm-display mt-3 max-w-xl text-[2.2rem] text-cream sm:text-4xl md:text-[3.4rem]">{t(`process.${current.id}.title`)}</h3>
                <p className="mt-4 max-w-lg text-[0.94rem] leading-6 text-cream/70 sm:mt-5 sm:text-base sm:leading-7 md:text-lg md:leading-8">{t(`process.${current.id}.body`)}</p>
                <button
                  type="button"
                  onClick={() => setActive((active + 1) % STEPS.length)}
                  className="mt-auto flex w-fit items-center gap-2 pt-10 text-sm font-semibold text-gold-light transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
