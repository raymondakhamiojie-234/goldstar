import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/#about' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Services', path: '/#services' },
    { name: 'Parts', path: '/#parts' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-lg shadow-gold/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          {/* We will use a CSS shape or icon for the logo until the real asset is added */}
          <div className="w-8 h-8 bg-gradient-gold rotate-45 flex items-center justify-center rounded-sm transition-transform group-hover:rotate-180 duration-700">
            <div className="w-4 h-4 bg-black rounded-sm" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold leading-tight tracking-wide text-white group-hover:text-gold transition-colors">GOLD STAR</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Engineering Hub</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-300 hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <a
            href="#contact"
            className="bg-gold hover:bg-gold-light text-black px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:shadow-[0_0_15px_rgba(255,201,0,0.4)] hover:-translate-y-0.5"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300 origin-top ${
          isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
      >
        <div className="flex flex-col py-6 px-6 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-lg font-medium text-gray-200 hover:text-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="#contact"
            className="bg-gold text-black text-center py-3 rounded-full font-bold uppercase tracking-wide mt-4"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
