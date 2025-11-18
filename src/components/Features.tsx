// Features.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CreditCard,
  Link2,
  RefreshCw,
  Wallet,
  BarChart3,
  Globe,
} from 'lucide-react';
import AnimatedObjects from './AnimatedObjects';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: CreditCard,
    title: 'Payment Gateway',
    description:
      'Accept payments with 100+ payment modes and experience the best success rates in the industry',
  },
  {
    icon: Link2,
    title: 'Payment Links',
    description:
      'Share payment links via email, SMS, or social media and get paid instantly without a website',
  },
  {
    icon: RefreshCw,
    title: 'Subscriptions',
    description:
      'Automate recurring payments and manage your subscription business with ease',
  },
  {
    icon: Wallet,
    title: 'Smart Collect',
    description:
      'Automate payment collection and reconciliation with virtual accounts',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description:
      'Get real-time insights into your payments with powerful analytics and reports',
  },
  {
    icon: Globe,
    title: 'International Payments',
    description:
      'Accept international payments in 100+ currencies with automatic conversion',
  },
];

const Features = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Entrance animation
        gsap.fromTo(
          card,
          { y: 150, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              end: 'top center',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        );

        // Slight upward movement while scrolling
        gsap.to(card, {
          y: -20,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          ease: 'none',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-black py-24 relative overflow-hidden">
      <AnimatedObjects count={4} color="green" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(16,185,129,0.2),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Everything you need to
            <span className="text-emerald-400"> accept payments</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A complete suite of payment products to power your business
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="w-full bg-gradient-to-br from-gray-900 to-gray-800 
                border border-emerald-500/20 rounded-2xl p-8 md:p-10 
                hover:border-emerald-500/50 transition-all duration-300 
                hover:shadow-2xl hover:shadow-emerald-500/10 group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="bg-emerald-500/10 p-6 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                  <feature.icon size={48} className="text-emerald-400" />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-lg">{feature.description}</p>
                </div>

                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105 font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
