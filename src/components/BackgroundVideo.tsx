import React, { useEffect, useRef } from 'react';

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevMouseXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile / Tablet autoplay (< 1024px)
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        video.autoplay = true;
        video.loop = true;
        video.play().catch(() => {
          // Autoplay policy fallback
        });
      } else {
        video.pause();
      }
    };

    handleResize();

    // Smooth seeking listener
    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (video && Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
        video.currentTime = targetTimeRef.current;
      }
    };

    video.addEventListener('seeked', handleSeeked);

    // Desktop Native Horizontal Scrubbing
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (!video.duration || Number.isNaN(video.duration)) return;

      if (prevMouseXRef.current === null) {
        prevMouseXRef.current = e.clientX;
        targetTimeRef.current = video.currentTime || 0;
        return;
      }

      const delta = e.clientX - prevMouseXRef.current;
      prevMouseXRef.current = e.clientX;

      // Update target video time using (delta / window.innerWidth) * 0.8 * video.duration
      const timeDelta = (delta / window.innerWidth) * 0.8 * video.duration;
      let newTime = targetTimeRef.current + timeDelta;

      // Clamp target time between 0 and video.duration
      newTime = Math.max(0, Math.min(video.duration, newTime));
      targetTimeRef.current = newTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = newTime;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      prevMouseXRef.current = e.clientX;
    };

    const handleMouseLeave = () => {
      prevMouseXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent select-none">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
        className="w-full h-full object-cover object-right lg:object-right-bottom"
      />
      {/* Editorial gradient overlays for high-contrast legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent pointer-events-none hidden lg:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none lg:hidden" />
    </div>
  );
}
