// CardStacking.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CardStackingProps {
  cardImages?: string[];
}

const DEFAULT_IMAGES = [
  // visually relevant, neutral Unsplash images (credit: Unsplash)
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526378721489-3f2a1b7b3b21?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80&auto=format&fit=crop",
  // add/remove to taste
];

const CardStacking = ({ cardImages = DEFAULT_IMAGES }: CardStackingProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // layout / animation knobs
  const STACK_GAP = 18;         // final vertical offset between stacked cards (px)
  const INITIAL_SPREAD = 28;    // initial Y gap per card (px)
  const INITIAL_SCALE_STEP = 0.05; // scale decrement per deeper card (initial state)
  const PIN_MULT = 320;         // scroll distance per card (px) -> controls how long the pin lasts
  const FLOAT_AMPLITUDE = 6;    // subtle floating amplitude
  const FLOAT_DURATION = 3.2;   // floating speed base

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // set sensible container height based on how many cards
    const desiredScroll = PIN_MULT * Math.max(1, cardImages.length);
    container.style.height = `${Math.max(720, desiredScroll + 420)}px`; // ensures big scroll area

    // initial visual layout - stacked with perspective
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const scale = 1 - idx * INITIAL_SCALE_STEP;
      const y = idx * INITIAL_SPREAD;
      const rotX = -12 + idx * 3;
      const rotZ = -4 + idx * 1.5;
      const zIndex = cardImages.length - idx;

      gsap.set(card, {
        transform: `translateY(${y}px) scale(${scale}) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`,
        zIndex,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform",
      });
    });

    // breathing / float to keep cards lively
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      gsap.to(card, {
        y: `+=${(idx % 2 === 0 ? FLOAT_AMPLITUDE : -FLOAT_AMPLITUDE)}`,
        duration: FLOAT_DURATION + idx * 0.22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: idx * 0.12,
        overwrite: false,
      });
    });

    // scroll-driven stacking timeline (pin container while stacking)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${PIN_MULT * Math.max(1, cardImages.length)}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });

    // animate each card into the compact stacked layout, one-by-one
    cardImages.forEach((_, idx) => {
      const card = cardsRef.current[idx];
      if (!card) return;

      // calculate final stacked offsets
      const finalY = idx * STACK_GAP; // small vertical separation in the stack
      const finalScale = 1 - idx * 0.01; // small scale difference for depth illusion
      const finalRotX = 6 - idx * 0.6; // slight front tilt for perspective
      const finalRotZ = idx * 0.6; // subtle stagger rotation

      // push this card's animation into the timeline
      tl.to(
        card,
        {
          y: finalY,
          x: 0,
          scale: finalScale,
          rotateX: finalRotX,
          rotateZ: finalRotZ,
          ease: "power3.out",
          duration: 0.6,
        },
        idx * 0.14 // stagger timing so cards stack sequentially
      );

      // after each card moves, also nudge z (depth) for better overlap
      tl.to(
        card,
        {
          z: 10 + (cardImages.length - idx) * 6,
          duration: 0.4,
        },
        idx * 0.14
      );
    });

    // cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(cardsRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardImages.length]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto relative"
      style={{
        perspective: "1400px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* card layer (centered) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: 80 }}
      >
        <div style={{ width: "76%", height: "calc(100% - 160px)", position: "relative" }}>
          {cardImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="absolute left-1/2 -translate-x-1/2 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                width: "560px",
                height: "360px",
                cursor: "grab",
                touchAction: "none",
              }}
            >
              <img
                src={image}
                alt={`Card ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ display: "block" }}
              />
              {/* subtle overlay for depth */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.08))",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardStacking;
