// ParallaxCardStack.tsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface ParallaxCardStackProps {
  cardImages: string[];
}

const ParallaxCardStack: React.FC<ParallaxCardStackProps> = ({ cardImages }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const prefersReducedMotion = useReducedMotion();

  // --- CONFIG ---
  const OFFSET_X = 0;       // left offset per card
  const OFFSET_Y = 30;        // upward offset per card
  const DEPTH_MULT = 20;       // translateZ per card
  const ROTATION_STEP = 2;  // small rotation per card
  const BASE_ROTATE = 0;     // base angle for first card

  useEffect(() => {
    setupInitial3D();

    // capture cleanup returned by applyMotionEffects (so we can remove mouse listener)
    let cleanup: (() => void) | undefined;
    if (prefersReducedMotion) {
      applyReducedMotionLayout();
    } else {
      cleanup = applyMotionEffects();
    }

    // On unmount or dependency change, cleanup tweens and listeners
    return () => {
      cleanup?.();
      // kill any lingering tweens on cards
      gsap.killTweensOf(cardsRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, cardImages.length]);

  /** INITIAL DEPTH + 3D CONFIG */
  const setupInitial3D = () => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      gsap.set(card, {
        z: DEPTH_MULT * (cardImages.length - i),
        transformPerspective: 1200,
        transformOrigin: "50% 50%",
        transformStyle: "preserve-3d",
      });
    });
  };


  /** FULL 3D ANIMATION MODE
   * returns a cleanup function to remove listeners
   */
  const applyMotionEffects = (): (() => void) => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // entrance animation
      gsap.fromTo(
        card,
        { x: -20 - i * 6, y: 40 + i * 8, opacity: 0, scale: 0.97 },
        {
          x: OFFSET_X * i,
          y: OFFSET_Y * i,
          rotation: BASE_ROTATE + i * ROTATION_STEP,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.6)",
          delay: i * 0.06,
        }
      );

      // floting
      gsap.to(card, {
        y: `+=${(i % 2 === 0 ? 1 : -1) * 12}`, // stronger movement
        x: `+=${(i % 2 === 0 ? -1 : 1) * 8}`, // small horizontal drift
        duration: 3 + i * 0.4,
        repeat: -1,          // infinite loop
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.15,
        overwrite: false,
});
      
    });

    // mouse tilt
    containerRef.current?.addEventListener("mousemove", handleMouseTilt);

    // return cleanup function
    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseTilt);
    };
  };

  /** MOUSE-TILT 3D EFFECT */
  const handleMouseTilt = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    cardsRef.current.forEach((card, i) => {
      const depth = DEPTH_MULT * (cardImages.length - i);
      const extraZ = Math.max(0, 10 - Math.abs(nx * 12)) * (1 - i * 0.12);

      gsap.to(card, {
        rotationY: nx * 10 - i * 0.6,
        rotationX: -ny * 8 + i * 0.2,
        z: depth + extraZ,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {cardImages.map((img, i) => {
        const rotate = BASE_ROTATE + i * ROTATION_STEP;
        const zIndex = cardImages.length - i;

        return (
          <div
            key={i}
            ref={(el) => el && (cardsRef.current[i] = el)}
            className="absolute rounded-lg overflow-hidden shadow-2xl"
            style={{
              width: "400px",
              height: "250px",
              bottom: "2%",
              right: "20%",
              transform: `rotateZ(${rotate}deg)`,
              zIndex,
            }}
          >
            {/* CARD CONTENT */}
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              <img
                src={img}
                alt={`card-${i}`}
                className="w-full h-full object-cover rounded-lg"
                draggable={false}
                style={{ transform: "translateZ(2px)", backfaceVisibility: "hidden" }}
              />

              {/* FRONT highlight */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.07), transparent)",
                  transform: "translateZ(10px)",
                }}
              />

              {/* BACK shadow */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  boxShadow: "0 30px 60px rgba(2,6,23,0.55)",
                  transform: "translateZ(-6px) scale(1.02)",
                }}
              />

              {/* EDGE BORDER */}
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  transform: "translateZ(12px)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Small hook to detect "reduced motion" */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export default ParallaxCardStack;
