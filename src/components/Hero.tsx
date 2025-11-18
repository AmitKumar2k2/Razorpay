import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, PlayCircle } from 'lucide-react';
import ParallaxCardStack from './ParallaxCardStack';
import FluidButton from './FluidButton';
import AnimatedCounter from './AnimatedCounter';
import AnimatedObjects from './AnimatedObjects';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const trustStripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (!prefersReducedMotion) {
        const headlineText =
          headlineRef.current?.querySelectorAll<HTMLSpanElement>('.headline-word');
        headlineText?.forEach((word, index) => {
          gsap.from(word, {
            y: 120,
            opacity: 0,
            duration: 0.9,
            ease: 'back.out(1.7)',
            delay: index * 0.08 + 0.1,
          });
        });

        gsap.from(subtextRef.current, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.5,
        });

        gsap.from(ctaRef.current?.children || [], {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          delay: 0.7,
        });

        gsap.from(trustStripRef.current?.children || [], {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 1.2,
        });

        gsap.from(statsRef.current?.children || [], {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 1.4,
        });
      } else {
        gsap.set(headlineRef.current, { opacity: 1, y: 0 });
        gsap.set(subtextRef.current, { opacity: 1, y: 0 });
        if (ctaRef.current) {
          Array.from(ctaRef.current.children).forEach((el) =>
            gsap.set(el, { opacity: 1, y: 0 })
          );
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const cardImages = [
    'https://i.pinimg.com/1200x/ff/c1/e3/ffc1e336102fca3318766364dc7c6a12.jpg',
    'https://images.unsplash.com/photo-1612795459707-1002f77720d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=', 
    'https://cdn.vectorstock.com/i/1000v/84/26/glass-morphism-style-credit-card-icon-cashless-vector-57218426.avif',
    'https://i.pinimg.com/736x/8a/05/fd/8a05fd714d418701f490e7ccbd38b8ff.jpg'
  ];

  const trustLogos = [  
    { name: 'Airbnb', initials: 'AB' },
    { name: 'Swiggy', initials: 'SW' },
    { name: 'BookMyShow', initials: 'BM' },
    { name: 'Zomato', initials: 'ZM' },
  ];

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-emerald-950 overflow-hidden pt-24 pb-12"
    >
      <AnimatedObjects count={5} color="emerald" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left z-10">
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <div className="inline-block max-w-full lg:max-w-[50vw] mx-auto lg:mx-0">
                <div className="flex flex-col lg:flex-row lg:items-end lg:gap-8">
                  <span className="headline-word block">Power</span>
                  <span className="headline-word block">your</span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end lg:gap-8">
                  <span className="headline-word block text-emerald-400">finance,</span>
                  <span className="headline-word block text-emerald-400">grow</span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end lg:gap-8">
                  <span className="headline-word block">your</span>
                  <span className="headline-word block">business</span>
                </div>
              </div>
            </h1>

            <p
              ref={subtextRef}
              className="text-base md:text-lg text-gray-300 mb-8 max-w-md leading-relaxed mx-auto lg:mx-0 text-center lg:text-left"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Accept payments, automate payouts, and experience seamless banking with India's most trusted payment solution
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 mb-12 items-center sm:items-start"
            >
              <div className="w-full sm:flex-1">
                <FluidButton variant="primary" className="w-full">
                  <span>Get Started</span>
                  <ArrowRight size={20} />
                </FluidButton>
              </div>

              <div className="w-full sm:flex-1">
                <FluidButton variant="secondary" className="w-full">
                  <PlayCircle size={20} />
                  <span>Watch Demo</span>
                </FluidButton>
              </div>
            </div>

            <div className="flex gap-8 text-sm text-gray-400 justify-center lg:justify-start">
              <div>✓ Instant Setup</div>
              <div>✓ 24/7 Support</div>
              <div>✓ 99.9% Uptime</div>
            </div>
          </div>

          <div className="lg:col-span-5 h-[520px] relative flex items-center justify-end">
            <div className="w-full flex items-center justify-center lg:-mr-16 xl:-mr-24">
              <ParallaxCardStack cardImages={cardImages} />
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-emerald-900/30">
          <div className="grid md:grid-cols-2 gap-12">
            <div ref={trustStripRef} className="flex items-center gap-8 overflow-x-auto">
              <span className="text-gray-500 whitespace-nowrap text-sm">Trusted by:</span>
              {trustLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center"
                >
                  <span className="text-sm font-bold text-emerald-400">{logo.initials}</span>
                </div>
              ))}
            </div>

            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              <AnimatedCounter end={50} duration={2.5} suffix="M+" label="Businesses" />
              <AnimatedCounter end={150} duration={2.5} suffix="B+" label="Processed" />
              <AnimatedCounter end={99} duration={2} suffix=".9%" label="Uptime" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;
