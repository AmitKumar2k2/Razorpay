import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    navItemsRef.current.forEach((item) => {
      if (!item) return;

      const handleMouseEnter = () => {
        gsap.to(item, {
          color: '#10b981',
          duration: 0.3,
          ease: 'power2.out',
        });

        gsap.to(item.querySelector('.nav-underline'), {
          scaleX: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          color: '#d1d5db',
          duration: 0.3,
          ease: 'power2.out',
        });

        gsap.to(item.querySelector('.nav-underline'), {
          scaleX: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        item.removeEventListener('mouseenter', handleMouseEnter);
        item.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-emerald-400">Razorpay</div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <div
              ref={(el) => {
                navItemsRef.current[0] = el;
              }}
              className="relative group text-gray-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <button className="flex items-center gap-1">
                Products <ChevronDown size={16} />
              </button>
              <div className="nav-underline absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 scale-x-0 origin-left"></div>
            </div>

            <div
              ref={(el) => {
                navItemsRef.current[1] = el;
              }}
              className="relative group text-gray-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <button className="flex items-center gap-1">
                Solutions <ChevronDown size={16} />
              </button>
              <div className="nav-underline absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 scale-x-0 origin-left"></div>
            </div>

            <div
              ref={(el) => {
                navItemsRef.current[2] = el;
              }}
              className="relative text-gray-300 transition-colors cursor-pointer"
            >
              <a href="#" className="flex items-center gap-1">
                Developers
              </a>
              <div className="nav-underline absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 scale-x-0 origin-left"></div>
            </div>

            <div
              ref={(el) => {
                navItemsRef.current[3] = el;
              }}
              className="relative text-gray-300 transition-colors cursor-pointer"
            >
              <a href="#" className="flex items-center gap-1">
                Resources
              </a>
              <div className="nav-underline absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 scale-x-0 origin-left"></div>
            </div>

            <div
              ref={(el) => {
                navItemsRef.current[4] = el;
              }}
              className="relative text-gray-300 transition-colors cursor-pointer"
            >
              <a href="#" className="flex items-center gap-1">
                Pricing
              </a>
              <div className="nav-underline absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 scale-x-0 origin-left"></div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-emerald-400 transition-colors px-4 py-2">
              Sign In
            </button>
            <button className="relative border-2 border-emerald-500 text-emerald-400 px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500 w-0 group-hover:w-full transition-all duration-300"></div>
              <span className="relative z-10 group-hover:text-white transition-colors">Sign Up</span>
            </button>
          </div>

          <button
            className="lg:hidden text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <a href="#" className="block text-gray-300 hover:text-emerald-400 py-2">
              Products
            </a>
            <a href="#" className="block text-gray-300 hover:text-emerald-400 py-2">
              Solutions
            </a>
            <a href="#" className="block text-gray-300 hover:text-emerald-400 py-2">
              Developers
            </a>
            <a href="#" className="block text-gray-300 hover:text-emerald-400 py-2">
              Resources
            </a>
            <a href="#" className="block text-gray-300 hover:text-emerald-400 py-2">
              Pricing
            </a>
            <button className="w-full border-2 border-emerald-500 text-emerald-400 px-6 py-3 rounded-md mt-4 hover:bg-emerald-500 hover:text-white transition-all duration-300">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
