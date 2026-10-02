import React from 'react';
import { AnimatedHiByHumanLogo } from './AnimatedHiByHumanLogo';

interface HeroBrandVideoProps {
  className?: string;
}

/**
 * HeroBrandVideo
 * 
 * Replaced video layer with lightweight SVG + CSS logo animation (AnimatedHiByHumanLogo).
 * Preserves component interface for backwards compatibility while ensuring zero MP4 network requests.
 */
export function HeroBrandVideo({ className = '' }: HeroBrandVideoProps) {
  return <AnimatedHiByHumanLogo className={className} />;
}

