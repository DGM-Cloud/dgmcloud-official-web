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
        <span className="ml-auto font-mono text-[10px] text-white/35">LIVE</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-[#081326]">
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
      className="group project-slide rounded-[1.25rem] border border-[#0a2044]/10 bg-white p-3 shadow-[0_18px_50px_rgba(7,26,56,.08)] lg:grid lg:grid-cols-[1.35fr_.65fr] lg:items-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
      style={{ width: `${100 / PROJECT_SLUGS.length}%`, flexBasis: `${100 / PROJECT_SLUGS.length}%` }}
    >
      <ProjectPreview slug={slug} />
      <div className="mt-6 px-1 pb-2 lg:mt-0 lg:px-0 lg:pb-0 lg:pl-10">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs text-[#075cf6]">{String(index + 1).padStart(2, '0')}</span>
          <span className="border-b border-[#075cf6]/30 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#52657c]">
            {t(`portfolio.projects.${slug}.stack`)}
          </span>
        </div>
        <h3 className="text-[2rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#071a38] sm:text-3xl lg:text-5xl">
          {t(`portfolio.projects.${slug}.title`)}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#52657c] md:text-base">
          {t(`portfolio.projects.${slug}.description`)}
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#075cf6] transition-colors hover:text-[#071a38] md:mt-7"
        >
          {t('portfolio.visitSite')} <ArrowUpRight className="size-4" aria-hidden />
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
      className="project-scroll scroll-mt-20 bg-[#f6f8fb] text-[#071a38]"
      style={{ position: 'relative' }}
    >
      <div className="project-sticky">
        <div className="section-shell flex h-full flex-col py-14 md:py-14">
          <div className="mb-6 grid gap-4 md:grid-cols-[1fr_0.68fr] md:items-end">
            <div>
              <p className="section-kicker mb-3">{t('portfolio.kicker')}</p>
              <h2 className="max-w-3xl text-[2.25rem] font-semibold leading-[1.03] tracking-[-0.045em] text-balance sm:text-4xl md:text-5xl">
                {t('portfolio.title')}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#52657c] md:justify-self-end md:text-base">
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
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#60728a]">
              {t('portfolio.scrollHint')}
            </span>
            <div className="hidden h-px flex-1 overflow-hidden bg-[#0a2044]/12 md:block">
              <motion.div className="h-full origin-left bg-[#075cf6]" style={{ scaleX: progress }} />
            </div>
            <span className="font-mono text-[10px] text-[#60728a]">06 / 06</span>
          </div>
        </div>
      </div>
    </section>
  );
}
