'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/locale-context';

const PROJECT_SLUGS = ['moreCorporation', 'boomTea', 'peludito', 'chelero', 'fiadito', 'maja'] as const;
type ProjectSlug = (typeof PROJECT_SLUGS)[number];

const PROJECTS: Record<ProjectSlug, { url: string; tone: string; image: string }> = {
  moreCorporation: { url: 'https://morecorporation.pe/', tone: 'from-[#0755a7] to-[#032d62]', image: '/portfolio/morecorporation.webp' },
  boomTea: { url: 'https://boomteaperu.com/wp/', tone: 'from-[#f7a62b] to-[#ef6d43]', image: '/portfolio/boomtea.webp' },
  peludito: { url: 'https://dgm-cloud.github.io/peludito/dashboard/', tone: 'from-[#2f77d0] to-[#12376f]', image: '/portfolio/peludito.webp' },
  chelero: { url: 'https://dgm-cloud.github.io/chelero/', tone: 'from-[#d78321] to-[#40200d]', image: '/portfolio/chelero.webp' },
  fiadito: { url: 'https://dgm-cloud.github.io/fiadito/', tone: 'from-[#6c4cf1] to-[#1d1753]', image: '/portfolio/fiadito.webp' },
  maja: { url: 'https://diegohlz.github.io/maja-calzados/', tone: 'from-[#b8896a] to-[#4b2d21]', image: '/portfolio/maja.webp' },
};

function ProjectPreview({ slug }: { slug: ProjectSlug }) {
  const { t } = useTranslations();
  const project = PROJECTS[slug];

  return (
    <div className={`project-browser bg-gradient-to-br ${project.tone}`}>
      <div className="project-browser-bar">
        <span className="bg-[#ff6159]" />
        <span className="bg-[#ffbd2e]" />
        <span className="bg-[#28c941]" />
        <div className="project-url">{new URL(project.url).hostname}</div>
        <span className="ml-auto font-mono text-[10px] tracking-[0.18em] text-gold-light/60">LIVE</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[0.55rem] bg-[#081326]">
        <Image
          src={project.image}
          alt={t(`portfolio.projects.${slug}.previewAlt`)}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      </div>
    </div>
  );
}

function ProjectCard({ slug, index }: { slug: ProjectSlug; index: number }) {
  const { t } = useTranslations();
  const project = PROJECTS[slug];

  return (
    <article
      className="group project-slide xm-card p-3 lg:grid lg:grid-cols-[1.35fr_.65fr] lg:items-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
      style={{ width: `${100 / PROJECT_SLUGS.length}%`, flexBasis: `${100 / PROJECT_SLUGS.length}%` }}
    >
      <ProjectPreview slug={slug} />
      <div className="mt-6 px-1 pb-2 lg:mt-0 lg:px-0 lg:pb-0 lg:pl-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-display text-3xl font-light italic leading-none text-gold-deep">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-8 bg-gold" aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
            {t(`portfolio.projects.${slug}.stack`)}
          </span>
        </div>
        <h3 className="xm-display text-[2.1rem] text-ink sm:text-4xl lg:text-[3.4rem]">
          {t(`portfolio.projects.${slug}.title`)}
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft md:text-base md:leading-7">
          {t(`portfolio.projects.${slug}.description`)}
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="xm-btn xm-btn-outline mt-6 min-h-11! px-5! md:mt-8"
        >
          {t('portfolio.visitSite')} <ArrowUpRight className="size-4 text-gold-deep" aria-hidden />
        </a>
      </div>
    </article>
  );
}

export function PortfolioSection() {
  const { t } = useTranslations();
  const container = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
  const finalOffset = `${-((PROJECT_SLUGS.length - 1) / PROJECT_SLUGS.length) * 100}%`;
  const x = useTransform(scrollYProgress, [0.08, 0.92], ['0%', finalOffset]);
  const progress = useTransform(scrollYProgress, [0.08, 0.9], [0, 1]);

  return (
    <section
      ref={container}
      id="portfolio"
      className="project-scroll scroll-mt-20 bg-cream text-ink"
      style={{ position: 'relative' }}
    >
      <div className="project-sticky">
        <div className="section-shell flex h-full flex-col py-14 md:py-14">
          <div className="mb-6 grid gap-4 md:grid-cols-[1fr_0.68fr] md:items-end">
            <div>
              <p className="xm-eyebrow mb-4">{t('portfolio.kicker')}</p>
              <h2 className="xm-display max-w-3xl text-[2.3rem] sm:text-4xl md:text-[3.4rem]">
                {t('portfolio.title')}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-ink-soft md:justify-self-end md:text-base">
              {t('portfolio.subtitle')}
            </p>
          </div>

          <div className="project-track-viewport">
            <motion.div
              className="project-track"
              style={{
                x: reduce ? '0%' : x,
                width: `${PROJECT_SLUGS.length * 100}%`,
                minWidth: `${PROJECT_SLUGS.length * 100}%`,
              }}
            >
              {PROJECT_SLUGS.map((slug, index) => (
                <ProjectCard key={slug} slug={slug} index={index} />
              ))}
            </motion.div>
          </div>

          <div className="mt-auto flex items-center gap-3 pt-7 sm:gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              {t('portfolio.scrollHint')}
            </span>
            <div className="hidden h-px flex-1 overflow-hidden bg-line md:block">
              <motion.div className="h-full origin-left bg-gradient-to-r from-gold-deep to-gold" style={{ scaleX: progress }} />
            </div>
            <span className="font-mono text-[10px] text-ink-soft">06 / 06</span>
          </div>
        </div>
      </div>
    </section>
  );
}
