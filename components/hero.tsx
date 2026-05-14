'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Layers2, Sparkles } from 'lucide-react';
import BlurText from '@/components/blur-text';
import { useTranslations } from '@/lib/i18n/locale-context';

/**
 * Hasta conocer viewport (primer frame `null`), NO marcamos ancho escritorio —
 * así no aplicamos opacity/y/scale ligados al scroll en móvil; si están activos antes
 * de que useScroll lleve valores estables en Safari/WebKit el hero queda opacity≈0.
 */
function useNarrowViewportAfterMount(): boolean | null {
  const [narrow, setNarrow] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return narrow;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export function Hero() {
  const { t } = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const narrowState = useNarrowViewportAfterMount();

  /* Parallax: hero fades + shrink al hacer scroll — solo escritorio estable (narrowState === false). */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.55], ['0%', '-8%']);
  const heroScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96]);

  const scrollLinkedFx =
    !reduceMotion && narrowState === false
      ? { opacity: heroOpacity, y: heroY, scale: heroScale }
      : undefined;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-center px-5 pb-10 pt-[4.25rem] scroll-mt-24 md:min-h-screen md:scroll-mt-28 md:px-6 md:pb-20 md:pt-20"
    >
      <motion.div
        className="mx-auto w-full max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={scrollLinkedFx}
      >
        {/* Eyebrow */}
        <div className="mb-4 text-center md:mb-8">
          <BlurText
            as="p"
            text={t('hero.eyebrow')}
            delay={90}
            className="justify-center text-xs font-semibold uppercase tracking-[0.26em] text-[#1e293b] dark:text-muted-foreground"
          />
        </div>

        {/* Main title */}
        <h1
          className="mb-5 overflow-visible text-center font-black leading-none tracking-[-0.06em] md:mb-10"
          style={{ fontSize: 'clamp(3rem,11vw,10rem)' }}
        >
          <BlurText
            as="span"
            text="DGM"
            delay={120}
            className="block w-full justify-center text-[#0c1f3f] dark:text-foreground"
          />
          {/*
            CLOUD — el glow-pulse va en el wrapper (bloque completo), no en el
            mismo elemento que background-clip:text. Así la capa de compositing
            es de ancho completo y la D no queda cortada en su borde derecho.
          */}
          <span className="glow-pulse block w-full">
            <BlurText
              as="span"
              text="CLOUD"
              delay={200}
              segmentClassName="cloud-iridescent"
              className="block w-full justify-center"
            />
          </span>
        </h1>

        {/* Subtitle */}
        <div className="mb-8 text-center md:mb-14">
          <BlurText
            as="p"
            text={t('hero.subtitle')}
            delay={70}
            className="mx-auto max-w-xl justify-center px-1 text-base leading-relaxed text-[#1e293b] md:px-0 md:text-lg lg:text-xl dark:text-muted-foreground"
          />
        </div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row md:mb-24 md:gap-5"
        >
          {/* Primary — marca: brillo superior, borde y sombra al color */}
          <motion.a
            href="#contact"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 460, damping: 22 }}
            className="btn-shimmer group relative z-10 inline-flex min-h-[2.875rem] shrink-0 items-center justify-center gap-2 rounded-full border border-primary/35 bg-primary px-8 py-3 text-[13px] font-semibold tracking-[0.04em] text-primary-foreground shadow-[0_10px_36px_-8px_rgba(0,115,252,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] dark:border-white/20 sm:min-h-[3rem] sm:gap-2.5 sm:px-10 sm:text-sm sm:tracking-wide"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-5 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-80 sm:inset-x-7"
            />
            <Sparkles
              aria-hidden
              className="size-[1rem] shrink-0 opacity-[0.92] sm:size-[1.125rem]"
            />
            <span className="whitespace-normal text-center leading-tight sm:whitespace-nowrap">
              {t('hero.ctaPrimary')}
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-[1rem] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] sm:size-[1.125rem]"
            />
          </motion.a>

          {/* Secondary — cristal con acento en hover */}
          <motion.a
            href="#portfolio"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 420, damping: 20 }}
            className="group relative inline-flex min-h-[2.875rem] shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-muted/50 px-8 py-3 text-[13px] font-semibold tracking-[0.04em] text-foreground/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md transition-[color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(0,115,252,0.45)] hover:bg-muted/65 hover:text-foreground hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_0_0_1px_rgba(0,115,252,0.08),0_12px_40px_-12px_rgba(0,115,252,0.22)] sm:min-h-[3rem] sm:gap-2.5 sm:px-10 sm:text-sm sm:tracking-wide dark:border-white/[0.13] dark:bg-white/[0.04] dark:text-white/85 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.09)] dark:hover:border-[rgba(0,115,252,0.5)] dark:hover:text-white dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(0,115,252,0.12),0_12px_40px_-12px_rgba(0,115,252,0.35)]"
          >
            <Layers2
              aria-hidden
              className="size-[1rem] shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary sm:size-[1.125rem] dark:text-white/55"
            />
            <span className="whitespace-normal text-center leading-tight sm:whitespace-nowrap">
              {t('hero.ctaSecondary')}
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-[0.9rem] shrink-0 opacity-70 transition-all duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:opacity-100 sm:size-[1rem]"
            />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <div className="flex h-10 w-6 items-center justify-center rounded-full border border-border">
            <div className="h-2 w-1 rounded-full bg-primary" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
