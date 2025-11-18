import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ArrowRight } from 'lucide-react';
import AnimatedObjects from './AnimatedObjects';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  'Instant settlements with no hidden charges',
  'Accept 100+ payment methods including UPI, cards, wallets',
  'Industry-leading success rates of 98%+',
  'Advanced fraud detection and prevention',
  'Easy integration with APIs and plugins',
  'Real-time payment tracking and notifications',
  'Comprehensive dashboard for business insights',
  'Dedicated account manager for enterprises',
];

const Benefits = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'center center',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        listRef.current?.children || [],
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'center center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-gray-900 py-24 relative overflow-hidden">
      <AnimatedObjects count={3} color="emerald" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(16,185,129,0.2),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="Business Growth"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
          </div>

          <div>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-8"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Built for your <span className="text-emerald-400">success</span>
            </h2>

            <div ref={listRef} className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <CheckCircle className="text-emerald-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={24} />
                  <p className="text-gray-300 text-lg">{benefit}</p>
                </div>
              ))}
            </div>

            <button className="group bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50 flex items-center gap-2">
              Start Accepting Payments
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
