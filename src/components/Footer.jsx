import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Clock
} from 'lucide-react';
import { company } from '../data/company';
import { services } from '../data/services';
import { productCategories } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import BrandLogo from './BrandLogo';

export default function Footer({ onOpenQuote }) {
  const { tr } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#0f2a4a] text-[#f7f9fc] border-t border-white/10 pt-4 sm:pt-8 pb-3 overflow-hidden relative">
      {/* Decorative Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#15b498]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="footer-inner mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Call to Action Row */}
        <div className="pb-6 mb-6 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-serif text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight whitespace-normal md:whitespace-nowrap">
              Let’s Engineer Your Next <span className="bg-gradient-to-r from-[#15b498] via-[#5eead4] to-[#15b498] bg-clip-text text-transparent">High-Impact Print Run.</span>
            </h2>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="h-[2px] w-12 bg-[#15b498] rounded-full"></span>
              <span className="h-px w-6 bg-white/20 rounded-full"></span>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={() => onOpenQuote()}
              className="px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#15b498] hover:bg-[#129a82] text-[#0f2a4a] font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>{tr('Request a Quote')}</span>
            </button>

            <a
              href={company.contact.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] sm:text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center gap-1.5 whitespace-nowrap hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{tr('WhatsApp Direct')}</span>
            </a>
          </div>
        </div>

        {/* 4-Column Editorial Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-4 sm:gap-6 pb-4 sm:pb-6 border-b border-white/10">
          {/* Column 1: Company Profile */}
          <div className="col-span-2 lg:col-span-2 space-y-2 sm:space-y-4">
            <Link to="/" className="inline-block hover:scale-105 active:scale-95 transition-transform duration-300" aria-label="Ganesha Enterprises home">
              <BrandLogo compact />
            </Link>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              Corporate printing, merchandise, packaging, and signage from New Delhi.
            </p>

            <div className="space-y-2 pt-1 sm:pt-2 text-[11px] sm:text-xs text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#15b498] shrink-0 mt-0.5" />
                <span>{company.contact.address.full}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#15b498] shrink-0" />
                <a href={`tel:${company.contact.phone.replace(/[^0-9]/g, '')}`} className="hover:text-[#15b498] transition-colors font-medium">
                  {company.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#15b498] shrink-0" />
                <a href={`mailto:${company.contact.email}`} className="hover:text-[#15b498] transition-colors">
                  {company.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#15b498] shrink-0" />
                <span>{company.contact.hours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div className="col-span-1 space-y-2 sm:space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              {tr('Our Services')}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-white/60">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="hover:text-[#15b498] transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Collections */}
          <div className="col-span-1 space-y-2 sm:space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              {tr('Collections')}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-white/60">
              {productCategories.filter(c => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="hover:text-[#15b498] transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/portfolio" className="hover:text-[#15b498] transition-colors inline-block hover:translate-x-1 duration-200">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-[#15b498] transition-colors inline-block hover:translate-x-1 duration-200">
                  Printing Insights & Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Verification */}
          <div className="col-span-2 lg:col-span-1 space-y-2 sm:space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              {tr('Print Journal')}
            </h4>
            <p className="text-xs text-white/60">
              Get occasional print and merchandise updates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter corporate email"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#15b498]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[#1f66a8] text-black hover:bg-white transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {newsletterSubscribed && (
                <p className="text-[11px] text-[#25D366] flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Subscription confirmed. Welcome!
                </p>
              )}
            </form>

          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[10px] sm:text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Ganesha Enterprises. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
            <Link to="/about" className="text-white/80 hover:text-[#15b498] font-medium transition-colors">
              About Us
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Specifications
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Plant Map & Visits
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

