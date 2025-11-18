import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const footerLinks = {
  Products: ['Payment Gateway', 'Payment Links', 'Payment Pages', 'Subscriptions', 'Smart Collect', 'Route'],
  Resources: ['Developer Docs', 'API Reference', 'Support', 'Blog', 'Case Studies', 'Webinars'],
  Company: ['About Us', 'Careers', 'Press', 'Partners', 'Contact', 'Trust & Security'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookie Policy', 'Compliance'],
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="text-3xl font-bold text-emerald-400 mb-4">Razorpay</div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Power your finance, grow your business. Trusted by millions of businesses worldwide.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-emerald-500 p-3 rounded-lg transition-colors"
              >
                <Twitter size={20} className="text-gray-300" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-emerald-500 p-3 rounded-lg transition-colors"
              >
                <Linkedin size={20} className="text-gray-300" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-emerald-500 p-3 rounded-lg transition-colors"
              >
                <Github size={20} className="text-gray-300" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-emerald-500 p-3 rounded-lg transition-colors"
              >
                <Mail size={20} className="text-gray-300" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4 text-lg">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Razorpay. Amit Kumar. All rights reserved.
            </p>
            <div className="flex gap-6">
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=80&h=40&fit=crop"
                alt="PCI DSS"
                className="h-10 opacity-60 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=40&fit=crop"
                alt="ISO Certified"
                className="h-10 opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
