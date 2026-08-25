import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-gold rotate-45 flex items-center justify-center rounded-sm">
                <div className="w-4 h-4 bg-black rounded-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight tracking-wide text-white">GOLD STAR</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Engineering Hub</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional automotive engineering, vehicle sales, repairs and electronic vehicle parts based in Lagos, Nigeria.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-gold text-sm transition-colors">Home</Link></li>
              <li><Link to="/#about" className="text-gray-400 hover:text-gold text-sm transition-colors">About Us</Link></li>
              <li><Link to="/vehicles" className="text-gray-400 hover:text-gold text-sm transition-colors">Vehicles</Link></li>
              <li><Link to="/#services" className="text-gray-400 hover:text-gold text-sm transition-colors">Services</Link></li>
              <li><Link to="/#parts" className="text-gray-400 hover:text-gold text-sm transition-colors">Electronic Parts</Link></li>
              <li><Link to="/#contact" className="text-gray-400 hover:text-gold text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <span className="block text-gray-500 text-xs mb-1 uppercase">Phone</span>
                <a href="tel:08037186643" className="hover:text-gold block">08037186643</a>
                <a href="tel:07084752096" className="hover:text-gold block">07084752096</a>
              </li>
              <li>
                <span className="block text-gray-500 text-xs mb-1 uppercase">Address</span>
                Sunrise Park, Sunrise Auto Dealers Association, Sunrise Bus Stop, Apapa/Oshodi Expressway, Lagos.
              </li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Follow Us</h4>
             {/* Social placeholders */}
             <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-colors">
                  IG
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-colors">
                  FB
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-colors">
                  TW
                </a>
             </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Gold Star Engineering Hub. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
