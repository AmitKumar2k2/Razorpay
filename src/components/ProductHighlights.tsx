import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, TrendingUp, Users } from 'lucide-react';
import AnimatedObjects from './AnimatedObjects';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    title: 'Bank-Grade Security',
    description: 'PCI DSS compliant with 256-bit encryption',
    image: 'https://plus.unsplash.com/premium_photo-1676618539992-21c7d3b6df0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2VjdXJpdHl8ZW58MHx8MHx8fDA%3D',
    icon: Shield,
  },
  {
    title: 'Lightning Fast',
    description: 'Process payments in under 3 seconds',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MTV8fHBheW1lbnR8ZW58MHx8MHx8fDA%3D=',
    icon: Zap,
  },
  {
    title: 'Boost Conversions',
    description: '30% higher success rates than competitors',
    image: 'https://media.istockphoto.com/id/1481194928/photo/sustainable-growth-chart.jpg?s=1024x1024&w=is&k=20&c=h7J-9OTazB0z6r0GljiQ-GcYTFct6egq_c4CQuggFpM=',
    icon: TrendingUp,
  },
  {
    title: '24/7 Support',
    description: 'Expert support whenever you need it',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    icon: Users,
  },
];

const ProductHighlights = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            rotateY: index % 2 === 0 ? -15 : 15,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              end: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-gradient-to-b from-black to-gray-900 py-24 relative overflow-hidden">
      <AnimatedObjects count={3} color="blue" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Why choose <span className="text-emerald-400">Razorpay</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built for businesses of all sizes with cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-2xl bg-gray-800 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 group-hover:bg-emerald-500/20 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-500 p-3 rounded-lg">
                      <highlight.icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{highlight.title}</h3>
                  </div>
                  <p className="text-gray-300 text-lg">{highlight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHighlights;
