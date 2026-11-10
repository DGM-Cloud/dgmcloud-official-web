'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Github, Linkedin, ExternalLink } from 'lucide-react';
import { teamMembers } from '@/lib/team';
import { useTranslations } from '@/lib/i18n/locale-context';

const linkClass =
  'inline-flex items-center gap-2 rounded-full border border-gold-deep/35 bg-card px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-gold-deep hover:bg-cream-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep';

const navButtonClass =
  'inline-flex size-11 items-center justify-center rounded-full border border-gold-deep/40 bg-card text-ink transition-colors hover:border-night hover:bg-night hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep';

export function TeamSection() {
  const { t } = useTranslations();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const total = teamMembers.length;
  const member = teamMembers[index] ?? teamMembers[0];

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const section = document.getElementById('team');
      if (!section) return;
      const inView =
        section.getBoundingClientRect().top < window.innerHeight &&
        section.getBoundingClientRect().bottom > 0;
      if (!inView) return;
      if (event.key === 'ArrowRight') go(index + 1);
      if (event.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index]);

  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <section id="team" className="scroll-mt-24 border-b border-line bg-cream-2 py-16 md:py-28">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="xm-eyebrow mb-5">{t('team.kicker')}</p>
            <h2 className="xm-display text-[clamp(2.2rem,8vw,3.9rem)] text-ink">{t('team.title')}</h2>
            <p className="mt-5 text-base leading-7 text-ink-soft md:text-lg md:leading-8">{t('team.subtitle')}</p>
            <p className="mt-5 flex items-center gap-3 text-sm font-semibold tracking-wide text-gold-deep">
              <span className="xm-sparkle size-3" aria-hidden />
              {t('team.line')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={() => go(index - 1)} className={navButtonClass} aria-label={t('team.prev')}>
              <ArrowLeft className="size-4" aria-hidden />
            </button>
            <p className="min-w-[4.5rem] text-center font-display text-lg font-light italic text-ink-soft">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <button type="button" onClick={() => go(index + 1)} className={navButtonClass} aria-label={t('team.next')}>
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="xm-card overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={member.id}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"
            >
              {/* Retrato */}
              <div className="relative aspect-[5/4] w-full bg-night sm:aspect-[4/3] md:aspect-auto md:min-h-[28rem] lg:min-h-[32rem]">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    width={810}
                    height={1080}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-night-2 to-night px-6 text-center">
                    <span className="flex size-20 items-center justify-center rounded-full border border-gold/50 font-display text-2xl text-gold-light">
                      {initials}
                    </span>
                    <p className="text-xs text-cream/60">{t('team.photoPending')}</p>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent" aria-hidden />
                <div className="pointer-events-none absolute inset-3 rounded-[0.9rem] border border-gold/45 md:inset-4" aria-hidden />
              </div>

              {/* Datos */}
              <div className="flex flex-col justify-center px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-12 lg:px-14">
                <p className="xm-eyebrow">{t(`team.members.${member.id}.role`)}</p>
                <h3 className="xm-display mt-4 text-[2.2rem] text-ink md:text-[3rem]">{member.name}</h3>
                <div className="xm-hairline mt-5 max-w-24" aria-hidden />
                <p className="mt-5 max-w-xl text-sm leading-6 text-ink-soft md:text-base md:leading-7">
                  {t(`team.members.${member.id}.bio`)}
                </p>

                <div className="mt-7 flex flex-wrap gap-2 md:mt-9">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Github className="size-4" aria-hidden />
                    {t('team.github')}
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Linkedin className="size-4" aria-hidden />
                    {t('team.linkedin')}
                  </a>
                  {member.portfolio ? (
                    <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <ExternalLink className="size-4" aria-hidden />
                      {t('team.portfolio')}
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Selector de integrantes */}
        <div
          className="mobile-scrollbar-hidden -mx-5 mt-6 flex snap-x gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
          role="tablist"
          aria-label={t('team.title')}
        >
          {teamMembers.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setIndex(i)}
                className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep ${
                  active
                    ? 'border-night bg-night text-gold-light'
                    : 'border-gold-deep/30 bg-card text-ink-soft hover:border-gold-deep hover:text-ink'
                }`}
              >
                {item.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
