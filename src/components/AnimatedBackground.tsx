import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CIRCLES = [
  { pos: 'top-1/4 left-1/4', w: 'w-64 h-64', color: 'bg-emerald-500/5' },
  { pos: 'top-1/3 right-1/4', w: 'w-96 h-96', color: 'bg-emerald-400/5' },
  { pos: 'bottom-1/4 left-1/3', w: 'w-80 h-80', color: 'bg-emerald-600/5' },
  { pos: 'bottom-1/3 right-1/3', w: 'w-72 h-72', color: 'bg-emerald-500/5' },
];

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // scope GSAP to the container so cleanup is automatic
    const ctx = gsap.context(() => {
      const circles = gsap.utils.toArray<HTMLElement>('.floating-circle');

      circles.forEach((circle) => {
        // random positional float
        gsap.to(circle, {
          x: 'random(-100, 100)',
          y: 'random(-100, 100)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // subtle scale pulse
        gsap.to(circle, {
          scale: 'random(0.8, 1.2)',
          duration: 'random(2, 4)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {CIRCLES.map((c, i) => (
        <div
          key={i}
          className={`floating-circle absolute ${c.pos} ${c.w} ${c.color} rounded-full blur-3xl`}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
