import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const companies = [
  { name: 'Airbnb', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=100&fit=crop' },
  { name: 'Swiggy', logo: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=200&h=100&fit=crop' },
  { name: 'BookMyShow', logo: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=200&h=100&fit=crop' },
  { name: 'Zomato', logo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=100&fit=crop' },
  { name: 'CRED', logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=100&fit=crop' },
  { name: 'Zerodha', logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=100&fit=crop' },
];

const TrustedBy = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!scrollRef.current) return;

      const logos = scrollRef.current.querySelectorAll('.logo-item');

      gsap.to(logos, {
        x: -1200,
        duration: 20,
        repeat: -1,
        ease: 'none',
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % 1200),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-gray-900 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h3 className="text-center text-2xl md:text-3xl font-bold text-gray-400">
          Trusted by <span className="text-emerald-400">8 million+</span> businesses
        </h3>
      </div>

      <div className="relative overflow-hidden">
        <div ref={scrollRef} className="flex gap-12">
          {[...companies, ...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="logo-item flex-shrink-0 w-48 h-24 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-32 h-16 object-cover rounded opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
