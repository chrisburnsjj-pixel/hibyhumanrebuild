import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  animated?: boolean;
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  brandName?: string;
  useImage?: boolean;
  layout?: 'horizontal' | 'vertical';
}

/**
 * HiByHuman Official Cybernetic 'H' Emblem Icon
 * Renders the official user-supplied artwork asset with transparent background.
 */
export function HiByHumanIcon({
  className = "w-10 h-10",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
  useImage?: boolean;
}) {
  const iconImg = (
    <img
      src="/images/hibyhuman-emblem.svg"
      alt="HiByHuman Official Emblem"
      className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]"
      loading="eager"
      decoding="sync"
    />
  );

  if (!animated) {
    return <div className={`relative shrink-0 select-none ${className}`}>{iconImg}</div>;
  }

  return (
    <motion.div
      animate={{
        y: [0, -2.5, 0],
        scale: [1, 1.015, 1],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`relative shrink-0 select-none ${className}`}
    >
      {iconImg}
    </motion.div>
  );
}

/**
 * HiByHuman Official Wordmark & Logo Component
 * Renders the official user-supplied artwork asset (/images/hibyhuman-logo-horizontal.svg).
 */
export function HiByHumanWordmark({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  className?: string;
}) {
  const isHero = size === 'hero';
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  const logoHeight = isHero
    ? 'h-16 sm:h-20 md:h-24'
    : isLg
    ? 'h-14 sm:h-16 md:h-20'
    : isSm
    ? 'h-9 sm:h-10'
    : 'h-10 sm:h-12 md:h-14';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/images/hibyhuman-logo-horizontal.svg"
        alt="HiByHuman"
        width={540}
        height={110}
        className={`${logoHeight} w-auto object-contain drop-shadow-[0_0_16px_rgba(0,229,255,0.45)]`}
        loading="eager"
        decoding="sync"
      />
    </div>
  );
}

/**
 * Full HiByHuman Official Brand Logo Lockup
 * Supports horizontal lockup (Navbar/Footer) or stacked vertical lockup (Hero/Pages)
 * Renders the approved real HiByHuman artwork assets with transparent background.
 */
export function HiByHumanLogo({
  size = 'md',
  className = '',
  layout = 'horizontal',
}: LogoProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const isHero = size === 'hero';

  const logoHeight = isHero
    ? 'h-16 sm:h-20 md:h-24'
    : isLg
    ? 'h-14 sm:h-16 md:h-20'
    : isSm
    ? 'h-9 sm:h-10'
    : 'h-10 sm:h-12 md:h-14';

  if (layout === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <img
          src="/images/hibyhuman-logo.svg"
          alt="HiByHuman Official Logo"
          width={440}
          height={340}
          className={`${logoHeight} w-auto object-contain drop-shadow-[0_0_20px_rgba(0,229,255,0.5)]`}
          loading="eager"
          decoding="sync"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/images/hibyhuman-logo-horizontal.svg"
        alt="HiByHuman Official Logo"
        width={540}
        height={110}
        className={`${logoHeight} w-auto object-contain drop-shadow-[0_0_16px_rgba(0,229,255,0.45)]`}
        loading="eager"
        decoding="sync"
      />
    </div>
  );
}

/**
 * HiByHuman Photographic 3D Futuristic Logo Image
 */
export function HiByHumanEmblemImage({
  className = "w-48 h-auto",
  alt = "HiByHuman Official Logo",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/images/hibyhuman-logo-horizontal.svg"
      alt={alt}
      className={`rounded-2xl shadow-2xl drop-shadow-[0_0_30px_rgba(0,212,255,0.25)] ${className}`}
    />
  );
}

// Backward-compatible exports
export const UnionJackEmblem = HiByHumanIcon;
export const UnionJackFullLogo = HiByHumanLogo;
export const HiByHumanEmblem = HiByHumanIcon;
export const HiByHumanFullLogo = HiByHumanLogo;
