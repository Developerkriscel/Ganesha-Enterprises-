import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Award, 
  Palette, 
  ArrowRight,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { company } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

export default function PageHero({ 
  badge = "Ganesha Enterprises", 
  title, 
  subtitle, 
  breadcrumbs = [],
  highlight,
  image = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop",
  children
}) {
  const { tr } = useLanguage();
  return (
    <section className="relative pt-32 pb-16 sm:pb-20 bg-gradient-to-b from-[#edf3f9] via-[#f7f9fc] to-[#f7f9fc] border-b border-[#dbe4ee] overflow-hidden">
      {/* Editorial Atmospheric Background Photo with Cream Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop" 
          alt="Atelier Background" 
          className="w-full h-full object-cover object-center opacity-20 filter saturate-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#edf3f9]/90 via-[#f7f9fc]/85 to-[#f7f9fc]"></div>
      </div>

      {/* Decorative Architectural Grain & Ambient Warm Glow */}
      <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none z-[1]"></div>
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#15b498]/10 rounded-full blur-[120px] pointer-events-none z-[1]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Trail */}
        {breadcrumbs.length > 0 && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-label="Breadcrumb" 
            className="flex items-center gap-2 text-xs text-[#56667a] mb-6"
          >
            <Link to="/" className="hover:text-[#0f2a4a] transition-colors">{tr('Home')}</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3 h-3 text-[#1f66a8]" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-[#0f2a4a] transition-colors">
                    {tr(crumb.name)}
                  </Link>
                ) : (
                  <span className="text-[#0f2a4a] font-medium">{tr(crumb.name)}</span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        )}

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Narrative & Typography */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7 space-y-5"
          >
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f2a4a] tracking-tight leading-[1.12]">
              {tr(title)} {highlight && <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent block sm:inline">{tr(highlight)}</span>}
            </h1>

            <div className="flex items-center gap-2.5 pt-1">
              <span className="h-[2px] w-12 bg-[#15b498] rounded-full"></span>
              <span className="h-px w-6 bg-[#dbe4ee] rounded-full"></span>
            </div>

            {subtitle && (
              <p className="text-base sm:text-lg text-[#56667a] leading-relaxed max-w-2xl">
                {tr(subtitle)}
              </p>
            )}

            {/* Custom child content (if provided by specific page) */}
            {children}
          </motion.div>

          {/* Right Column: Layered Editorial Photo & Atelier Studio Hub Card */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 relative group"
          >
            {/* Ambient subtle spinning ring accent */}
            <div className="absolute -inset-6 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-[#15b498]/25 blur-[1px]"></div>
            </div>

            {/* Layer 1: Editorial Craftsmanship Photo Peeking Directly Behind the Card */}
            <div className="absolute -top-3 -right-3 -bottom-3 -left-3 sm:-top-4 sm:-right-4 sm:-bottom-4 sm:-left-4 rounded-[2rem] overflow-hidden -rotate-2 sm:-rotate-3 shadow-2xl border-2 border-[#15b498]/30 bg-[#0f2a4a] transition-all duration-700 ease-out group-hover:rotate-0 group-hover:scale-[1.02]">
              <img 
                src={image} 
                alt="Production Printing Facility" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20"></div>
              
              {/* Top & Bottom Badges on the Photo Frame */}
              <div className="absolute top-3.5 left-5 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-[#15b498] border border-white/10 flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1f66a8] animate-pulse"></span>
                <span>Plant Facility • Naraina Studio</span>
              </div>
              <div className="absolute bottom-3.5 right-5 text-[10px] font-semibold tracking-wider text-white/60">
                Est. 2011 • New Delhi
              </div>
            </div>

            {/* Layer 2: Main Glassmorphic Atelier Hub Card in Front */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/80 shadow-2xl hover:border-[#15b498]/60 transition-all duration-500 overflow-hidden">
              
              {/* Shimmer sweep effect on hover */}
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
              </div>

              {/* Card Header: Live Plant Status & Swatch Strip */}
              <div className="flex items-center justify-between pb-5 border-b border-[#e6edf5]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f2a4a]">
                    Studio Plant Active
                  </span>
                </div>

                {/* Swiss CMYK + Gold Calibration Swatches */}
                <div className="flex items-center gap-1.5" title="Pantone® / CMYK / Gold Standard">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#009ee3]" title="Cyan"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e5007d]" title="Magenta"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffed00]" title="Yellow"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0f2a4a]" title="Key Black"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1f66a8] shadow-sm" title="Metallic Gold"></span>
                </div>
              </div>

              {/* Atelier Credentials Matrix */}
              <div className="grid grid-cols-2 gap-3 py-5">
                <div className="p-3.5 rounded-2xl bg-[#f7f9fc] border border-[#e6edf5] space-y-1 group/box hover:border-[#15b498]/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[#1f66a8]">
                    <Palette className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Color Fidelity</span>
                  </div>
                  <div className="text-xs font-bold text-[#0f2a4a]">Swiss Calibration</div>
                  <div className="text-[10px] text-[#56667a]">Pantone® Matching</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f7f9fc] border border-[#e6edf5] space-y-1 group/box hover:border-[#15b498]/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[#1f66a8]">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Fast Turnaround</span>
                  </div>
                  <div className="text-xs font-bold text-[#0f2a4a]">24-48h Expedited</div>
                  <div className="text-[10px] text-[#56667a]">Pan-India Logistics</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f7f9fc] border border-[#e6edf5] space-y-1 group/box hover:border-[#15b498]/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[#1f66a8]">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Certified</span>
                  </div>
                  <div className="text-xs font-bold text-[#0f2a4a]">MSME & ISO Standard</div>
                  <div className="text-[10px] text-[#56667a]">Strict QA Inspection</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f7f9fc] border border-[#e6edf5] space-y-1 group/box hover:border-[#15b498]/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[#1f66a8]">
                    <Award className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Production</span>
                  </div>
                  <div className="text-xs font-bold text-[#0f2a4a]">Est. 2011 • Delhi</div>
                  <div className="text-[10px] text-[#56667a]">1,000+ Verified Clients</div>
                </div>
              </div>

              {/* Direct Plant Manager Hotline Strip */}
              <div className="pt-4 border-t border-[#e6edf5] flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#56667a] font-medium">Direct Facility Line:</div>
                  <a 
                    href={`tel:${company.contact.phone.replace(/[^0-9]/g, '')}`} 
                    className="text-xs font-bold text-[#0f2a4a] hover:text-[#15b498] transition-colors inline-flex items-center gap-1 mt-0.5"
                  >
                    <PhoneCall className="w-3 h-3 text-[#15b498]" />
                    <span>{company.contact.phoneDisplay}</span>
                  </a>
                </div>

                <Link
                  to="/quote"
                  className="px-4 py-2 rounded-full bg-[#0f2a4a] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#15b498] transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5 group/btn"
                >
                  <span>Quick Quote</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

