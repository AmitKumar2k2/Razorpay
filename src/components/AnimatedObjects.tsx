import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedObjectsProps {
  count?: number;  
}

const AnimatedObjects = ({ count = 6 }: AnimatedObjectsProps) => { 
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current) return;

    const nodes = root.current.querySelectorAll(".ao");

    nodes.forEach((node, i) => {
      gsap.to(node, {
        x: (i % 2 ? 1 : -1) * 15,
        y: (i % 3 ? -1 : 1) * 10,
        duration: 3 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(node, {
        opacity: 0.25,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });

    return () => gsap.killTweensOf(nodes);
  }, [count]);

  return (
    <div
      ref={root}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 20 }}  
    >
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        return (
          <div
            key={i}
            className="ao"
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: "100px",     
              height: "100px",    
              borderRadius: "50%",
              background: "rgba(16,185,129,0.18)", 
              opacity: 0.2,
            }}
          />
        );
      })}
    </div>
  );
};

export default AnimatedObjects;
