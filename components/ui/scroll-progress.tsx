'use client';

import { memo } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export const ScrollProgressBar = memo(function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-primary"
      style={{ scaleX }}
    />
  );
});
