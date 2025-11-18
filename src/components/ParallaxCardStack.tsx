// ParallaxCardStack.tsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface ParallaxCardStackProps {
  cardImages: string[];
}

const ParallaxCardStack: React.FC<ParallaxCardStackProps> = ({ cardImages }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // --- CONFIG (we'll adapt some values for small screens) ---
  const OFFSET_X_DESKTOP = 0;
  const OFFSET_Y_DESKTOP = 30;
  const DEPTH_MULT_DESKTOP = 20;
  const ROTATION_STEP_DESKTOP = 2;
  const BASE_ROTATE = 0;

  // Small-screen overrides
  const OFFSET_X_MOBILE = 0;
  const OFFSET_Y_MOBILE = 12;
  const DEPTH_MULT_MOBILE = 8;
  const ROTATION_STEP_MOBILE = 1;
  const FLOAT_AMPLITUDE_DESKTOP = 12;
  const FLOAT_AMPLITUDE_MOBILE = 4;

  useEffect(() => {
    // detect small screens and update state (also listen for changes)
    const mq = window.matchMedia('(max-width: 640px)'); // tailwind 'sm' breakpoint
    const update = () => setIsSmallScreen(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    setupInitial3D();
    let cleanup: (() => void) | undefined;
    cleanup = applyMotionEffects();
    return () => {
      cleanup?.();
      gsap.killTweensOf(cardsRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSmallScreen, cardImages.length]);

  /** INITIAL DEPTH + 3D CONFIG */
  const setupInitial3D = () => {
    const DEPTH_MULT = isSmallScreen ? DEPTH_MULT_MOBILE : DEPTH_MULT_DESKTOP;
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, {
        z: DEPTH_MULT * (cardImages.length - i),
        transformPerspective: 1200,
        transformOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
      });
    });
  };

  /** FULL 3D ANIMATION MODE — returns cleanup fn */
  const applyMotionEffects = (): (() => void) => {
    const OFFSET_X = isSmallScreen ? OFFSET_X_MOBILE : OFFSET_X_DESKTOP;
    const OFFSET_Y = isSmallScreen ? OFFSET_Y_MOBILE : OFFSET_Y_DESKTOP;
    const ROTATION_STEP = isSmallScreen ? ROTATION_STEP_MOBILE : ROTATION_STEP_DESKTOP;
    const DEPTH_MULT = isSmallScreen ? DEPTH_MULT_MOBILE : DEPTH_MULT_DESKTOP;
    const FLOAT_AMPLITUDE = isSmallScreen ? FLOAT_AMPLITUDE_MOBILE : FLOAT_AMPLITUDE_DESKTOP;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // entrance animation (faster & smaller offsets on mobile)
      gsap.fromTo(
        card,
        { x: -10 - i * 3, y: 20 + i * 6, opacity: 0, scale: isSmallScreen ? 0.95 : 0.97 },
        {
          x: OFFSET_X * i,
          y: OFFSET_Y * i,
          rotation: BASE_ROTATE + i * ROTATION_STEP,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.6)',
          delay: i * 0.05,
        }
      );

      // subtle floating + small horizontal drift
      gsap.to(card, {
        y: `+=${(i % 2 === 0 ? 1 : -1) * FLOAT_AMPLITUDE}`,
        x: `+=${(i % 2 === 0 ? -1 : 1) * (isSmallScreen ? 3 : 8)}`,
        duration: 2.8 + i * 0.25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.12,
        overwrite: false,
      });
    });

    // For desktop we keep a subtle mouse-tilt; for mobile we make it minimal (or skip heavy tilt)
    const handleMouseTilt = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      cardsRef.current.forEach((card, i) => {
        const depth = DEPTH_MULT * (cardImages.length - i);
        const extraZ = Math.max(0, 10 - Math.abs(nx * 12)) * (1 - i * 0.12);
        const multiplier = isSmallScreen ? 0.25 : 1; // reduce tilt on mobile

        gsap.to(card, {
          rotationY: nx * 10 * multiplier - i * 0.6 * multiplier,
          rotationX: -ny * 8 * multiplier + i * 0.2 * multiplier,
          z: depth + extraZ * multiplier,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    // Attach mousemove only on non-touch devices for better perf; still safe on mobile but tilt reduced
    containerRef.current?.addEventListener('mousemove', handleMouseTilt);

    // cleanup function
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseTilt);
    };
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {cardImages.map((img, i) => {
        const rotate = BASE_ROTATE + i * (isSmallScreen ? ROTATION_STEP_MOBILE : ROTATION_STEP_DESKTOP);
        const zIndex = cardImages.length - i;

        /* NOTE:
           - Use responsive Tailwind classes for card size:
             - mobile: w-[220px] h-[140px]
             - sm:     w-[300px] h-[180px]
             - md+:    w-[400px] h-[250px]
           - keeping the rest of styling in className for clarity
        */
        return (
          <div
            key={i}
            ref={(el) => el && (cardsRef.current[i] = el)}
            className="absolute rounded-lg overflow-hidden shadow-2xl"
            style={{
              /* keep rotate in style so GSAP can override transforms cleanly */
              transform: `rotateZ(${rotate}deg)`,
              zIndex,
              /* position offsets - these are kept relative so the stack sits nicely on the right */
              bottom: '2%',
              right: isSmallScreen ? '6%' : '20%',
            }}
          >
            {/* responsive size via Tailwind classes */}
            <div
              className="relative w-[220px] h-[140px] sm:w-[300px] sm:h-[180px] md:w-[400px] md:h-[250px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={img}
                alt={`card-${i}`}
                className="w-full h-full object-cover rounded-lg"
                draggable={false}
                style={{ transform: 'translateZ(2px)', backfaceVisibility: 'hidden' }}
              />

              {/* FRONT highlight */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.07), transparent)',
                  transform: 'translateZ(10px)',
                }}
              />

              {/* BACK shadow */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  boxShadow: '0 30px 60px rgba(2,6,23,0.55)',
                  transform: 'translateZ(-6px) scale(1.02)',
                }}
              />

              {/* EDGE BORDER */}
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  border: '1px solid rgba(255,255,255,0.06)',
                  transform: 'translateZ(12px)',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Small hook to detect "reduced motion" (keeps same behavior as before) */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export default ParallaxCardStack;
