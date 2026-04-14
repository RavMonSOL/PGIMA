import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'For Employers', path: '/employers' },
  { name: 'For Applicants', path: '/applicants' },
  { name: 'Success Stories', path: '/success-stories' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent flex flex-col',
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-slate-800'
          : 'bg-transparent'
      )}
    >
      {/* Anti-Scam Notice */}
      <div className="bg-red-600 text-white text-xs py-2 px-4 text-center font-medium flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
        <span>⚠️ <strong>ANTI-SCAM ALERT:</strong> We do NOT collect fees via GCash or Maya.</span>
        <span className="hidden sm:inline">|</span>
        <span>Official Socials: <a href="https://www.facebook.com/modelopremiumcollections" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-200">Facebook</a></span>
      </div>
      <div className={cn("container mx-auto px-4 md:px-6 transition-all duration-300", isScrolled ? "py-3" : "py-5")}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white overflow-hidden group-hover:opacity-90 transition-opacity">
              <img src="/logo.png" alt="Prime Goal Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none tracking-tight text-white">Prime Goal</span>
              <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">International Manpower</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-blue-400',
                  location.pathname === link.path ? 'text-blue-500' : 'text-slate-300'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/applicants"
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
            >
              Search Jobs
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 shadow-xl">
          <div className="flex flex-col px-4 py-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-lg font-medium transition-colors',
                  location.pathname === link.path ? 'text-blue-500' : 'text-slate-300'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/applicants"
              className="mt-4 px-5 py-3 text-center text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Search Jobs
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
