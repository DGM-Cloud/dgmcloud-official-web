'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Github, Linkedin, ExternalLink } from 'lucide-react';
import { teamMembers } from '@/lib/team';
import { useTranslations } from '@/lib/i18n/locale-context';

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
    <section id="team" className="scroll-mt-24 border-b border-border bg-muted/40 py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker mb-3">{t('team.kicker')}</p>
            <h2 className="section-title">{t('team.title')}</h2>
            <p className="section-lede mt-4">{t('team.subtitle')}</p>
            <p className="mt-4 text-sm font-medium tracking-wide text-foreground/80">
              {t('team.line')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t('team.prev')}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <p className="min-w-[4.5rem] text-center font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t('team.next')}
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={member.id}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"
            >
              {/* Vertical portrait */}
              <div className="relative aspect-[3/4] w-full bg-secondary md:aspect-auto md:min-h-[28rem] lg:min-h-[32rem]">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-secondary to-muted px-6 text-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-background text-2xl font-semibold tracking-tight text-foreground">
                      {initials}
                    </span>
                    <p className="text-xs text-muted-foreground">{t('team.photoPending')}</p>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center px-6 py-8 sm:px-8 md:px-10 md:py-12 lg:px-12">
                <p className="text-sm font-medium text-primary">
                  {t(`team.members.${member.id}.role`)}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {member.name}
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t(`team.members.${member.id}.bio`)}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Github className="h-4 w-4" aria-hidden />
                    {t('team.github')}
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden />
                    {t('team.linkedin')}
                  </a>
                  {member.portfolio ? (
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden />
                      {t('team.portfolio')}
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Member rail */}
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label={t('team.title')}>
          {teamMembers.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setIndex(i)}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
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
