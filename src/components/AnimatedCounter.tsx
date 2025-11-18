import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
}

const AnimatedCounter = ({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  label = '',
}: AnimatedCounterProps) => {
  const counterRef = useRef<HTMLDivElement | null>(null);
  const lastValueRef = useRef<string>('');
  const [displayText, setDisplayText] = useState('0');

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finalText = `${prefix}${Math.floor(end).toLocaleString()}${suffix}`;

    if (prefersReduced) {
      // Immediately set final value and skip animation
      lastValueRef.current = finalText;
      setDisplayText(finalText);
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { value: 0 };

      gsap.to(obj, {
        value: end,
        duration: duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reset',
        },
        onUpdate() {
          const current = Math.floor(obj.value);
          const newText = `${prefix}${current.toLocaleString()}${suffix}`;
          // avoid calling setState when the displayed text hasn't changed
          if (newText !== lastValueRef.current) {
            lastValueRef.current = newText;
            setDisplayText(newText);
          }
        },
      });
    }, counterRef);

    return () => ctx.revert();
  }, [end, duration, prefix, suffix]);

  return (
    <div className="text-center">
      <div
        ref={counterRef}
        className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2 font-mono"
      >
        {displayText}
      </div>
      {label && <div className="text-sm md:text-base text-gray-400">{label}</div>}
    </div>
  );
};

export default AnimatedCounter;
