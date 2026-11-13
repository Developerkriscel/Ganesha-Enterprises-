import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { company } from '../data/company';
import { services } from '../data/services';
import { productCategories } from '../data/products';

export default function Footer({ onOpenQuote }) {
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
    <footer className="bg-[#18191b] text-[#faf8f5] border-t border-white/10 pt-20 pb-12 overflow-hidden relative">
      {/* Decorative Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c59b27]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Call to Action Row */}
        <div className="pb-16 mb-16 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#c59b27] font-semibold">
              Ready to elevated your brand tactile experience?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Let’s Engineer Your Next High-Impact Print Run.
            </h2>
            <p className="text-sm text-white/60">
              Direct access to senior master printers, sample swatch books, and guaranteed corporate SLA turnarounds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenQuote()}
              className="px-8 py-4 rounded-full bg-[#c59b27] hover:bg-[#b8860b] text-[#18191b] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request a Quote</span>
            </button>

            <a
              href={company.contact.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest border border-white/10 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* 4-Column Editorial Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#18191b] flex items-center justify-center font-serif font-bold text-lg">
                GE
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-white">
                  GANESHA ENTERPRISES
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#c59b27] font-semibold">
                  Luxury Print Architecture
                </span>
              </div>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              New Delhi's premier corporate printing and bespoke merchandise studio. We engineer high-DPI digital printing, Japanese UV finishing, custom employee welcome kits, and luxury packaging for India's foremost enterprise institutions.
            </p>

            <div className="space-y-3 pt-2 text-xs text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                <span>{company.contact.address.full}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#c59b27] shrink-0" />
                <a href={`tel:${company.contact.phone.replace(/[^0-9]/g, '')}`} className="hover:text-[#c59b27] transition-colors font-medium">
                  {company.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#c59b27] shrink-0" />
                <a href={`mailto:${company.contact.email}`} className="hover:text-[#c59b27] transition-colors">
                  {company.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#c59b27] shrink-0" />
                <span>{company.contact.hours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="hover:text-[#c59b27] transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Collections */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              {productCategories.filter(c => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="hover:text-[#c59b27] transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/portfolio" className="hover:text-[#c59b27] transition-colors inline-block hover:translate-x-1 duration-200">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-[#c59b27] transition-colors inline-block hover:translate-x-1 duration-200">
                  Printing Insights & Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Verification */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Print Journal
            </h4>
            <p className="text-xs text-white/60">
              Receive quarterly substrate guides, seasonal corporate gifting previews, and packaging trends.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter corporate email"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c59b27]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[#c59b27] text-black hover:bg-white transition-colors"
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

            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c59b27]">
                  <ShieldCheck className="w-4 h-4" />
                  Industrial Plant Guarantee
                </div>
                <p className="text-[11px] text-white/50">
                  Full production, finishing, and QA conducted on-site in Naraina Industrial Area Phase 1.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Ganesha Enterprises. All rights reserved. Registered under MSME & ISO standards.
          </div>

          <div className="flex items-center gap-6">
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

