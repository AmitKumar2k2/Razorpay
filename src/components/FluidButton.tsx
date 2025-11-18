import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FluidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const FluidButton = ({ children, onClick, className = '', variant = 'primary' }: FluidButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const fill = fillRef.current;

    if (!button || !fill) return;

    const handleMouseEnter = () => {
      gsap.to(fill, {
        width: '100%',
        duration: 0.5,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });

      gsap.to(button, {
        boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(fill, {
        width: '0%',
        duration: 0.5,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });

      gsap.to(button, {
        boxShadow: '0 0 0px rgba(16, 185, 129, 0)',
        duration: 0.3,
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const baseStyles =
    'relative px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden group cursor-pointer border-2 border-emerald-500';

  // 🔥 Text is now ALWAYS WHITE
  const textColor = 'text-white transition-colors';

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`${baseStyles} ${textColor} ${className}`}
    >
      <div
        ref={fillRef}
        className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg"
        style={{ width: '0%' }}
      ></div>

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default FluidButton;
