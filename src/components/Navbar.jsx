import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  MessageSquare, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';
import MegaMenu from './MegaMenu';
import { company } from '../data/company';

export default function Navbar({ onOpenSearch, onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products', hasMega: true },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Journals', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent text-white py-5 border-b border-white/10'
            : 'bg-[#faf8f5]/95 backdrop-blur-md text-[#18191b] py-3.5 shadow-sm border-b border-[#e4e2dd]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#c59b27] text-white flex items-center justify-center font-serif font-bold text-lg transition-all shadow-md">
                GE
              </div>
              <div className="flex flex-col">
                <span className={`font-serif text-lg sm:text-xl font-bold tracking-tight transition-colors leading-none ${
                  isTransparent ? 'text-white' : 'text-[#18191b] group-hover:text-[#b8860b]'
                }`}>
                  GANESHA
                </span>
                <span className={`text-[10px] uppercase tracking-[0.25em] font-semibold mt-1 ${
                  isTransparent ? 'text-white/70' : 'text-[#686a71]'
                }`}>
                  Enterprises • New Delhi
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative"
                  onMouseEnter={() => link.hasMega && setMegaMenuOpen(true)}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 inline-flex items-center gap-1 rounded-full ${
                        isActive
                          ? 'text-[#c59b27] bg-white/10 backdrop-blur-sm'
                          : isTransparent
                            ? 'text-white/90 hover:text-[#c59b27] hover:bg-white/10'
                            : 'text-[#18191b] hover:text-[#b8860b] hover:bg-black/5'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    {link.hasMega && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                    )}
                  </NavLink>
                </div>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Search catalog"
                className={`p-2.5 rounded-full transition-colors ${
                  isTransparent
                    ? 'text-white hover:text-[#c59b27] hover:bg-white/10'
                    : 'text-[#18191b] hover:text-[#b8860b] hover:bg-black/5'
                }`}
                title="Search Products & Services"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Direct Phone / WhatsApp Quick Pill */}
              <a
                href="tel:9650044234"
                className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isTransparent
                    ? 'text-white bg-white/10 border border-white/20 hover:border-[#c59b27]'
                    : 'text-[#18191b] bg-white border border-[#e4e2dd] hover:border-[#b8860b]'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>+91 96500 44234</span>
              </a>

              {/* Request a Quote CTA */}
              <button
                onClick={() => onOpenQuote()}
                className="px-5 py-2.5 rounded-full bg-[#c59b27] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#d4aa36] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Request a Quote</span>
              </button>
            </div>

            {/* Mobile Actions & Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenSearch}
                aria-label="Search"
                className={`p-2 rounded-full transition-colors ${
                  isTransparent ? 'text-white hover:bg-white/10' : 'text-[#18191b] hover:bg-black/5'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => onOpenQuote()}
                className="px-3 py-1.5 rounded-full bg-[#c59b27] text-white text-[11px] font-semibold uppercase tracking-wider shadow-sm"
              >
                Quote
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
                className={`p-2 rounded-xl transition-colors ${
                  isTransparent ? 'text-white hover:bg-white/10' : 'text-[#18191b] hover:bg-black/5'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu 
          isOpen={megaMenuOpen} 
          onClose={() => setMegaMenuOpen(false)} 
        />
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#faf8f5] pt-24 pb-8 px-6 overflow-y-auto lg:hidden animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold border-b border-[#e4e2dd] pb-2">
              Navigation Menu
            </span>

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-serif font-bold py-2 border-b border-[#eceae5] flex items-center justify-between ${
                    isActive ? 'text-[#b8860b]' : 'text-[#18191b]'
                  }`
                }
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </NavLink>
            ))}

            <div className="pt-6 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3.5 rounded-2xl bg-[#18191b] text-white font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-[#c59b27]" />
                Request a Custom Quote
              </button>

              <a
                href={company.contact.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Studio (+91 96500 44234)
              </a>

              <a
                href={`tel:${company.contact.phone.replace(/[^0-9]/g, '')}`}
                className="w-full py-3 rounded-2xl bg-white border border-[#e4e2dd] text-[#18191b] font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#b8860b]" />
                Call +91 96500 44234
              </a>
            </div>

            <div className="pt-6 text-xs text-[#686a71] space-y-1">
              <p className="font-semibold text-[#18191b]">{company.name}</p>
              <p>{company.contact.address.line1}, {company.contact.address.city}</p>
              <p>{company.contact.email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

