import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Palette,
  Award,
  Zap,
  Clock,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  Eye,
  Layers,
  Printer,
  Package,
  Cpu,
  Play,
  Pause,
  Sparkles,
  X
} from 'lucide-react';
import { company } from '../data/company';
import { products, productCategories } from '../data/products';
import { services } from '../data/services';
import { portfolioItems } from '../data/portfolio';
import { blogs } from '../data/blogs';
import BrandStrip from '../components/BrandStrip';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import Carousel from '../components/Carousel';
import StandardsInfographic from '../components/StandardsInfographic';
import CategoryInfographic from '../components/CategoryInfographic';
import { useLanguage } from '../context/LanguageContext';

// ── Animation Variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
};

// ── Animated Counter Component ──────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(current * 10) / 10);
    }, (duration * 1000) / steps);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  const display = target.includes('.') ? count.toFixed(1) : Math.floor(count);
  const prefix = target.replace(/[0-9.]/g, '').replace(suffix, '');
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

function HeroAutoPlay({ heroTab, setHeroTab, total }) {
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setHeroTab(prev => (prev + 1) % total);
      }, 3500);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, total, setHeroTab]);

  return (
    <button
      onClick={() => setPlaying(p => !p)}
      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#15b498] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
      title={playing ? 'Pause auto-play' : 'Resume auto-play'}
    >
      {playing ? (
        <Pause className="w-4 h-4 text-[#15b498] group-hover:text-white transition-colors" />
      ) : (
        <Play className="w-4 h-4 text-[#15b498] group-hover:text-white transition-colors ml-0.5" />
      )}
    </button>
  );
}

export default function Home({ onOpenQuote, onOpenLightbox }) {
  const { tr } = useLanguage();
  // Hero active slide / showcase tab
  const [heroTab, setHeroTab] = useState(0);

  const heroShowcases = [
    {
      title: "Executive Welcome Kits",
      tag: "Corporate Onboarding",
      image: "https://ganeshaenterprises.in/assets/imgs/feature-5/Welcome_Kit.jpg",
      backupImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop",
      desc: "Debossed thermal diaries, matte vacuum flasks, metal pens and custom magnetic presentation boxes."
    },
    {
      title: "Luxury Cotton Visiting Cards",
      tag: "Executive Stationery",
      image: "https://ganeshaenterprises.in/assets/imgs/prodact/IN_Standard-Visiting-Cards_Overview.jpeg",
      backupImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      desc: "450 GSM French cotton boards with raised polymer spot gloss and metallic gold edge gilding."
    },
    {
      title: "Airline & Corporate Apparel",
      tag: "Vistara & Enterprise",
      image: "https://ganeshaenterprises.in/assets/imgs/prodact/Men_s-Scott-Polo-T-Shirts_Category-page.jpeg",
      backupImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
      desc: "240 GSM bio-washed combed pique polo shirts with high-density Madeira German embroidery."
    },
    {
      title: "Double-Wall Thermal Flasks",
      tag: "VIP Merchandise",
      image: "https://ganeshaenterprises.in/assets/imgs/feature-5/Vacuum_Flask_with_3%20Steel_Cup.jpg",
      backupImage: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1200&auto=format&fit=crop",
      desc: "SUS 304 food-grade stainless steel with rotary 360-degree laser engraving and matching steel cups."
    }
  ];

  // Featured products for the editorial showcase
  const featuredProducts = products.filter(p => p.featured);

  // Selected portfolio items for preview
  const featuredPortfolio = portfolioItems.slice(0, 6);

  // Contact quick form state for Section J
  const [quickContact, setQuickContact] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Corporate & Office Printing',
    message: ''
  });
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [selectedHomeBlog, setSelectedHomeBlog] = useState(null);

  useEffect(() => {
    if (!selectedHomeBlog) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedHomeBlog(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedHomeBlog]);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickContact.name || !quickContact.phone) return;
    setQuickSubmitted(true);
  };

  const getIcon = (name) => {
    switch (name) {
      case 'Palette': return <Palette className="w-6 h-6 text-[#1f66a8]" />;
      case 'Award': return <Award className="w-6 h-6 text-[#1f66a8]" />;
      case 'Value': return <ShieldCheck className="w-6 h-6 text-[#1f66a8]" />;
      case 'Zap': return <Zap className="w-6 h-6 text-[#1f66a8]" />;
      case 'Clock': return <Clock className="w-6 h-6 text-[#1f66a8]" />;
      default: return <Printer className="w-6 h-6 text-[#1f66a8]" />;
    }
  };

  return (
    <div className="overflow-hidden">
      {/* =========================================================
          SECTION B: CINEMATIC HERO SECTION
          ========================================================= */}
      <section className="relative min-h-[82vh] lg:min-h-[90vh] flex items-center justify-center pt-24 pb-10 overflow-hidden">
        {/* Fullscreen Background Video */}
        <div className="absolute inset-x-0 top-[44px] bottom-0 lg:top-[48px] z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f2a4a]/60 via-[#0f2a4a]/45 to-[#0f2a4a]/65"></div>
          {/* Warm golden tint overlay */}
          <div className="absolute inset-0 bg-[#15b498]/3 mix-blend-overlay"></div>
          {/* Bottom fade to the next section */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f7f9fc] to-transparent"></div>
        </div>

        {/* Subtle Architectural Grain Background */}
        <div className="absolute inset-0 bg-grain opacity-15 pointer-events-none z-[1]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

            {/* Left Column: Editorial Headline & Narrative */}
            <div className="lg:col-span-7 lg:justify-self-center lg:-translate-x-4 -translate-y-2 lg:-translate-y-4 space-y-4 sm:space-y-5 text-left">
              {/* Prestige Studio Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-[#1f66a8] animate-pulse"></span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/90">
                  Swiss Color Fidelity • New Delhi Production Studio
                </span>
              </motion.div>

              {/* Editorial Master Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-2"
              >
                <h1 className="font-serif text-2xl sm:text-2xl xl:text-[2.7rem] font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-lg transition-transform duration-500 hover:scale-[1.02]">
                  {tr("WE DON'T JUST PRINT.")} <br />
                  <span className="brand-gradient-text italic font-normal drop-shadow-[0_0_16px_rgba(21,180,152,0.35)]">{tr('WE CREATE')}</span> {tr('IMPRESSIONS.')}
                </h1>
              </motion.div>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl font-normal"
              >
                {/* {company.subTagline} Serving corporate pioneers, aviation fleets, and luxury brand houses with masterfully engineered paper, packaging, apparel, and signage. */}
              </motion.p>

              {/* Primary Call to Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 pt-2 w-full"
              >
                <Link
                  to="/products"
                  className="w-full sm:w-auto flex-none justify-center px-3 sm:px-5 py-2.5 rounded-full bg-[#1f66a8] text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-widest hover:bg-[#19558f] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-1.5 sm:gap-2 group whitespace-nowrap"
                >
                  <span>{tr('Explore Our Collection')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={() => onOpenQuote()}
                  className="w-full sm:w-auto flex-none justify-center px-3 sm:px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-widest border border-white/25 hover:border-[#15b498] hover:bg-white/15 transition-all duration-300 shadow-sm flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
                >
                  <span>{tr('Request a Quote')}</span>
                </button>
              </motion.div>

              {/* Micro Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="pt-5 border-t border-white/15 grid grid-cols-3 gap-4 text-xs"
              >
                <div>
                  <div className="font-serif font-bold text-lg text-white"><AnimatedCounter target="15" suffix="+ Years" /></div>
                  <div className="text-[11px] text-white/50">Production Heritage</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-lg text-white"><AnimatedCounter target="1000" suffix="+" /></div>
                  <div className="text-[11px] text-white/50">Verified Brands</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-lg text-white"><AnimatedCounter target="99.8" suffix="%" /></div>
                  <div className="text-[11px] text-white/50">SLA On-Time Dispatch</div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Immersive 3D Rotating Showcase */}
            <div className="lg:col-span-5 relative lg:justify-self-center lg:-translate-x-10 lg:translate-y-8">
              {/* Ambient golden orb glow behind the card stack */}
              <div className="absolute -inset-8 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#15b498]/10 blur-[80px] animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-[#15b498]/20 animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-[#15b498]/10 animate-[spin_30s_linear_infinite_reverse]"></div>
              </div>

              <div className="relative z-10" style={{ perspective: '1200px' }}>
                {/* Stacked card deck with 3D tilt */}
                <div className="relative w-[460px] max-w-[calc(100vw-2rem)] h-[420px] sm:h-[480px] lg:h-[550px] max-h-none lg:max-h-[68vh] mx-auto">
                  {heroShowcases.map((item, idx) => {
                    const isActive = idx === heroTab;
                    const offset = idx - heroTab;
                    return (
                      <div
                        key={idx}
                        onClick={() => setHeroTab(idx)}
                        className="absolute inset-0 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                        style={{
                          transform: isActive
                            ? 'translateZ(0) rotateY(0deg) scale(1)'
                            : `translateZ(-${Math.abs(offset) * 80}px) translateX(${offset * 40}px) rotateY(${offset * -8}deg) scale(${1 - Math.abs(offset) * 0.08})`,
                          zIndex: heroShowcases.length - Math.abs(offset),
                          opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.25,
                          filter: isActive ? 'none' : `brightness(${0.7 - Math.abs(offset) * 0.1})`
                        }}
                      >
                        <div className={`w-full h-full rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl border-2 transition-all duration-500 ${isActive ? 'border-[#15b498] bg-black/35 shadow-[0_0_50px_rgba(21,180,152,0.35)]' : 'border-white/20 bg-black/25'}`}>
                          <div className="relative w-full h-full">
                            <img
                              src={item.image}
                              alt={item.title}
                              onError={(e) => { e.currentTarget.src = item.backupImage; }}
                              className="w-full h-full object-cover opacity-50 mix-blend-screen transition-all duration-700"
                            />
                            {/* Glass gradient overlay allowing video to show through */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

                            {/* Top tag */}
                            <div className={`absolute top-5 left-5 px-4 py-1.5 rounded-full backdrop-blur-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${isActive ? 'bg-[#15b498]/90 text-white border-[#15b498] shadow-lg' : 'bg-white/10 text-white/90 border-white/20'}`}>
                              {item.tag}
                            </div>

                            {/* Bottom info — only on active card */}
                            <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                              <h3 className="font-serif text-xl sm:text-3xl font-bold text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                                {item.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-white/80 mt-2 line-clamp-2 max-w-md drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                                {item.desc}
                              </p>
                              <div className="flex items-center gap-3 mt-4">
                                <button
                                  onClick={(e) => { e.stopPropagation(); onOpenQuote(item.title); }}
                                  className="px-5 py-2.5 rounded-full bg-[#1f66a8] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#19558f] transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
                                >
                                  <span>Get Quote</span>
                                </button>
                                <Link
                                  to="/products"
                                  className="px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/25 transition-all border border-white/25 flex items-center gap-2"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Explore</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Playback control + dot indicators */}
                <div className="mt-6 flex items-center justify-center gap-6">
                  {/* Auto-play toggle */}
                  <HeroAutoPlay heroTab={heroTab} setHeroTab={setHeroTab} total={heroShowcases.length} />

                  {/* Dot navigation */}
                  <div className="flex items-center gap-2">
                    {heroShowcases.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setHeroTab(idx)}
                        className="group relative"
                      >
                        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${idx === heroTab
                          ? 'bg-[#1f66a8] scale-125 shadow-[0_0_12px_rgba(21,180,152,0.5)]'
                          : 'bg-white/40 hover:bg-white/60'
                          }`} />
                        {idx === heroTab && (
                          <div className="absolute -inset-1.5 rounded-full border border-[#15b498]/40 animate-ping"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION H: TRUSTED BY BRANDS (Authentic Logo Marquee)
          ========================================================= */}
      <BrandStrip />

      {/* =========================================================
          SECTION C: BRAND VALUE PROPOSITIONS & METRICS
          ========================================================= */}
      <section className="scroll-mt-24 py-8 sm:py-8 bg-[#f7f9fc] relative">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            variants={staggerContainer}
            className="text-center max-w-5xl mx-auto mb-4 sm:mb-6 space-y-2"
          >
            <motion.h2 variants={fadeUp} className="mx-auto max-w-[22rem] sm:max-w-5xl px-2 font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-[#0f2a4a] tracking-tight leading-tight break-words">
              Why Leading Enterprises <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Entrust Their Brand</span> to Us
            </motion.h2>
            <div className="flex items-center justify-center gap-2.5 pt-0.5">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#15b498]/60"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#15b498]"></span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#15b498]/60"></span>
            </div>
          </motion.div>

          <StandardsInfographic valueProps={company.valueProps} />
        </div>
      </section>

      {/* =========================================================
          SECTION D: FEATURED PRODUCTS SHOWCASE (Editorial Grid)
          ========================================================= */}
      <section className="py-12 bg-[#edf3f9]/60 border-y border-[#dbe4ee]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
          >
            <motion.div variants={fadeLeft} className="max-w-2xl space-y-2.5">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
                Featured <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Corporate Products</span>
              </h2>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="h-[2px] w-10 bg-[#15b498] rounded-full"></span>
                <span className="h-px w-6 bg-[#dbe4ee] rounded-full"></span>
              </div>
            </motion.div>

            <motion.div variants={fadeRight}>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0f2a4a] hover:text-[#1f66a8] transition-colors border-b-2 border-[#0f2a4a] hover:border-[#1f66a8] pb-1 w-max"
              >
                <span>{tr('View All 90+ Products')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Editorial Asymmetric Grid */}
          <Carousel>
            {featuredProducts.slice(0, 8).map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuoteRequest={onOpenQuote}
                priority={idx < 4}
              />
            ))}
          </Carousel>
        </div>
      </section>

      {/* =========================================================
          SECTION E: ABOUT GANESHA ENTERPRISES (Visual Storytelling)
          ========================================================= */}
      <section className="home-about-section py-6 sm:py-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

            {/* Left Imagery Composition - Matched Height to Right Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20px' }}
              variants={fadeLeft}
              className="lg:col-span-6 flex flex-col"
            >
              <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-[#dbe4ee] hover:border-[#1f66a8] hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 ease-out bg-[#0f2a4a] h-full min-h-[360px] flex flex-col justify-between cursor-pointer">
                {/* Light sweep shimmer effect */}
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                  <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                </div>

                {/* Main Image with Zoom on Hover */}
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
                  alt="Ganesha Enterprises Workshop"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a4a]/90 via-[#0f2a4a]/20 to-transparent"></div>

                {/* Top Floating Badge */}
                <div className="relative z-20 p-4 sm:p-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#dbe4ee] shadow-md text-[11px] font-bold text-[#0f2a4a]">
                    <span className="w-2 h-2 rounded-full bg-[#15b498]"></span>
                    <span>Since 2011 · Naraina, New Delhi</span>
                  </div>
                </div>

                {/* Bottom Overlay Title */}
                <div className="relative z-20 p-5 sm:p-6 text-white">
                  <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug drop-shadow-sm group-hover:text-white transition-colors">
                    Advanced Printing Technology with Precision Quality
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Right Storytelling Column - Matched Height to Left Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20px' }}
              variants={fadeUp}
              className="home-about-story lg:col-span-6 flex flex-col justify-between space-y-3 sm:space-y-3.5"
            >
              <div className="space-y-1.5">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
                  Delivering Premium <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Print & Branding</span> Since 2011.
                </h2>

                <div className="flex items-center gap-2 pt-0.5">
                  <span className="h-[2px] w-12 bg-gradient-to-r from-[#15b498] to-[#1f66a8] rounded-full"></span>
                  <span className="h-px w-6 bg-[#dbe4ee] rounded-full"></span>
                </div>

                <p className="text-xs sm:text-[12.5px] text-[#56667a] leading-relaxed pt-0.5">
                  At Ganesha Enterprises, we specialize in professional digital printing solutions that combine quality, speed, and creativity — all without stretching your budget. Whether you’re a high-growth startup, an airline pioneer, or a multinational enterprise, we deliver customized print solutions that bring your brand identity to life.
                </p>
              </div>

              {/* 4 Interactive Feature Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    title: 'Pantone® Ink Calibration',
                    desc: 'Exact Pantone & brand color matching',
                    icon: Palette,
                  },
                  {
                    title: 'High-DPI UV Flatbeds',
                    desc: 'High-resolution Japanese UV flatbed printers',
                    icon: Printer,
                  },
                  {
                    title: 'Sculpted Foil Embossing',
                    desc: 'Premium gold & metallic foil embossing',
                    icon: Layers,
                  },
                  {
                    title: 'Doorstep Pan-India Logistics',
                    desc: 'Safe doorstep delivery across India',
                    icon: ShieldCheck,
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group/item flex items-start gap-2.5 p-2 rounded-xl bg-white border border-[#dbe4ee] hover:border-[#15b498] hover:shadow-xs transition-all duration-300"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#edf3f9] text-[#1f66a8] group-hover/item:bg-[#15b498] group-hover/item:text-white flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11.5px] font-bold text-[#0f2a4a] group-hover/item:text-[#1f66a8] transition-colors line-clamp-1">
                          {tr(item.title)}
                        </div>
                        <div className="about-feature-desc text-[9.5px] text-[#7a8ba0] line-clamp-1">
                          {tr(item.desc)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Key Metrics Strip (3 pillars) */}
              <div className="grid grid-cols-3 gap-3 py-2 border-y border-[#edf3f9]">
                <div className="text-center sm:text-left">
                  <div className="font-serif text-base sm:text-lg font-bold text-[#0f2a4a]">
                    14+ <span className="text-[#15b498] text-xs">Yrs</span>
                  </div>
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-[#7a8ba0]">Heritage</div>
                </div>
                <div className="text-center sm:text-left border-x border-[#edf3f9] px-2 sm:px-0">
                  <div className="font-serif text-base sm:text-lg font-bold text-[#0f2a4a]">
                    1,000+
                  </div>
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-[#7a8ba0]">Enterprises</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-serif text-base sm:text-lg font-bold text-[#0f2a4a]">
                    99.8%
                  </div>
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-[#7a8ba0]">On-Time SLA</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-0.5 flex items-center gap-3">
                <Link
                  to="/about"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#0f2a4a] to-[#1f66a8] hover:from-[#15b498] hover:to-[#0f2a4a] text-white text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm inline-flex items-center gap-1.5 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>{tr('View Details')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/contact"
                  className="px-4 py-2 rounded-full border border-[#dbe4ee] hover:border-[#15b498] text-[11px] font-semibold text-[#0f2a4a] hover:text-[#1f66a8] hover:bg-[#edf3f9]/50 transition-all cursor-pointer"
                >
                  {tr('Schedule Plant Tour')}
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION F: OUR SERVICES (Comprehensive Printing Services)
          ========================================================= */}
      <section className="py-12 bg-[#f7f9fc] border-t border-[#dbe4ee]">
        <div className="w-full px-3 sm:px-5 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto mb-10 space-y-3"
          >
            <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
              Complete Commercial & <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Corporate Printing Services</span>
            </motion.h2>
            <div className="flex items-center justify-center gap-2.5 pt-1">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#15b498]/60"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#15b498]"></span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#15b498]/60"></span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 w-full py-4"
          >
            {services.slice(0, 6).map((service, idx) => (
              <motion.div
                key={service.id}
                custom={idx}
                variants={fadeUp}
                className="relative z-10 hover:z-30 transition-all"
              >
                <ServiceCard
                  service={service}
                  onQuoteRequest={onOpenQuote}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-[#dbe4ee] text-[#0f2a4a] hover:border-[#1f66a8] hover:text-[#1f66a8] text-xs font-bold uppercase tracking-widest shadow-xs transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore All Printing Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION G: PRODUCT CATEGORIES (5 Steps Arrow Infographic)
          ========================================================= */}
      <section className="py-10 sm:py-14 bg-[#f7f9fc] border-t border-[#dbe4ee]">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12"
          >
            <motion.div variants={fadeLeft} className="max-w-2xl space-y-2.5">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
                Explore by <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Product Category</span>
              </h2>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="h-[2px] w-10 bg-[#15b498] rounded-full"></span>
                <span className="h-px w-6 bg-[#dbe4ee] rounded-full"></span>
              </div>
            </motion.div>

            <motion.div variants={fadeRight}>
              <Link
                to="/products"
                className="text-xs font-bold uppercase tracking-widest text-[#0f2a4a] hover:text-[#1f66a8] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Browse All Categories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <CategoryInfographic categories={productCategories} />
        </div>
      </section>

      {/* =========================================================
          SECTION I: PORTFOLIO — OUR RECENT WORK (Agency Gallery)
          ========================================================= */}
      <section className="py-24 bg-white border-t border-[#dbe4ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <motion.div variants={fadeLeft} className="max-w-2xl space-y-2.5">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
                Recent Client <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Projects</span>
              </h2>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="h-[2px] w-10 bg-[#15b498] rounded-full"></span>
                <span className="h-px w-6 bg-[#dbe4ee] rounded-full"></span>
              </div>
            </motion.div>

            <motion.div variants={fadeRight}>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0f2a4a] hover:text-[#1f66a8] transition-colors border-b-2 border-[#0f2a4a] hover:border-[#1f66a8] pb-1 w-max"
              >
                <span>Explore Complete Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Project Grid with Lightbox Action */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 py-3"
          >
            {featuredPortfolio.map((item, idx) => (
              <motion.div
                key={item.id}
                custom={idx}
                variants={fadeUp}
                className="relative z-10 hover:z-30"
              >
                <div className="group rounded-2xl sm:rounded-3xl bg-white border border-[#dbe4ee] hover:border-[#15b498] overflow-hidden transition-all duration-350 ease-out hover:scale-[1.035] sm:hover:scale-[1.045] hover:-translate-y-2 hover:shadow-[0_24px_50px_-10px_rgba(15,42,74,0.22),0_10px_20px_-5px_rgba(21,180,152,0.2)] flex flex-col justify-between relative will-change-transform">
                  {/* Top subtle ambient glowing line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#15b498]/0 to-transparent group-hover:via-[#15b498] transition-all duration-500 z-30"></div>

                  {/* Light sweep shimmer effect */}
                  <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                    <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                  </div>

                  {/* Compact Visual Header */}
                  <div
                    className="relative aspect-[16/9.5] bg-[#0f2a4a] overflow-hidden cursor-pointer"
                    onClick={() => onOpenLightbox(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) => { e.currentTarget.src = item.backupImage; }}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9.5px] font-bold uppercase tracking-widest text-white border border-white/10 group-hover:bg-[#15b498] transition-colors duration-300">
                      {item.category}
                    </div>
                  </div>

                  {/* Compact Content Body */}
                  <div className="p-4 sm:p-4.5 space-y-1.5 bg-gradient-to-b from-white to-[#fafcff]">
                    <div className="flex items-center justify-between text-[11px] text-[#1f66a8] font-semibold">
                      <span>Client: {item.client}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#edf3f9] text-[9.5px] font-bold border border-[#dbe4ee]/60">{item.year}</span>
                    </div>

                    <h3
                      onClick={() => onOpenLightbox(item)}
                      className="font-serif text-[15px] sm:text-base font-bold text-[#0f2a4a] group-hover:text-[#1f66a8] transition-colors cursor-pointer line-clamp-1 leading-snug"
                    >
                      {item.title}
                    </h3>

                    <div className="pt-2 border-t border-[#edf3f9] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onOpenLightbox(item)}
                        className="text-[11px] font-bold text-[#0f2a4a] hover:text-[#1f66a8] inline-flex items-center gap-1 cursor-pointer py-1 group/link transition-colors"
                      >
                        <span>{tr('View Details')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform text-[#15b498]" />
                      </button>
                      <button
                        onClick={() => onOpenQuote(item.title)}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-[#1f66a8] to-[#15b498] hover:from-[#15b498] hover:to-[#1f66a8] text-white text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        Quote Similar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION J: CONTACT & DIRECT QUOTE SECTION
          ========================================================= */}
      <section className="home-contact-section py-10 sm:py-16 lg:py-24 bg-[#0f2a4a] text-white relative overflow-hidden">
        {/* Subtle Ambient Radial Light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#15b498]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-center">

            {/* Contact Details & Business Positioning */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20px' }}
              variants={staggerContainer}
              className="home-contact-copy lg:col-span-5 space-y-4 sm:space-y-6"
            >
              <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Give Us a Printing Deal for <span className="bg-gradient-to-r from-[#15b498] via-[#5eead4] to-[#15b498] bg-clip-text text-transparent">Your Enterprise.</span>
              </motion.h2>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="h-[2px] w-12 bg-[#15b498] rounded-full"></span>
                <span className="h-px w-6 bg-white/20 rounded-full"></span>
              </div>

              <motion.p variants={fadeUp} className="text-sm text-white/70 leading-relaxed">
                Connect directly with our production team at the Naraina Industrial Area plant. We provide paper sample kits, quick color proofs, and reliable on-time delivery across India.
              </motion.p>

              <motion.div variants={fadeUp} className="space-y-4 pt-4 border-t border-white/10 text-xs text-white/80">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 hover:border-[#15b498]/40 transition-colors">
                  <div className="text-[10px] uppercase tracking-wider text-[#15b498] font-semibold">Primary Facility & Address:</div>
                  <p className="font-medium text-white">{company.contact.address.full}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 hover:border-[#15b498]/40 transition-colors">
                    <div className="text-[10px] uppercase tracking-wider text-[#15b498] font-semibold">Direct Mobile / Call:</div>
                    <a href={`tel:${company.contact.phone.replace(/[^0-9]/g, '')}`} className="font-medium text-white hover:text-[#15b498] block">
                      {company.contact.phoneDisplay}
                    </a>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 hover:border-[#15b498]/40 transition-colors">
                    <div className="text-[10px] uppercase tracking-wider text-[#15b498] font-semibold">Official Inquiries:</div>
                    <a href={`mailto:${company.contact.email}`} className="font-medium text-white hover:text-[#15b498] block">
                      {company.contact.email}
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="pt-2">
                <a
                  href={company.contact.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#20ba5a] transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Immediately on WhatsApp</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Request a Quote Form Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20px' }}
              variants={fadeRight}
              className="home-quick-quote lg:col-span-7"
            >
              <div className="home-quick-quote-card bg-[#f7f9fc] text-[#0f2a4a] p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-[#dbe4ee]">
                <div className="home-quick-form-heading space-y-2 mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#1f66a8]">
                    Fast Turnaround Quote
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0f2a4a]">
                    Request a Custom Project Estimate
                  </h3>
                  <p className="text-xs text-[#56667a]">
                    Fill in your project requirements. Stored locally with immediate confirmation.
                  </p>
                </div>

                {quickSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-serif text-xl font-bold text-[#0f2a4a]">Request Submitted Successfully</h4>
                    <p className="text-xs text-[#56667a]">
                      Thank you, <strong>{quickContact.name}</strong>. Your inquiry has been stored locally. You can also reach our plant manager directly on WhatsApp.
                    </p>
                    <button
                      onClick={() => setQuickSubmitted(false)}
                      className="px-5 py-2 rounded-full bg-[#0f2a4a] text-white text-xs font-semibold"
                    >
                      Submit Another Query
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="home-quick-form space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={quickContact.name}
                          onChange={(e) => setQuickContact({ ...quickContact, name: e.target.value })}
                          placeholder="e.g. Vikram Singhania"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={quickContact.phone}
                          onChange={(e) => setQuickContact({ ...quickContact, phone: e.target.value })}
                          placeholder="+91 96500 44234"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={quickContact.email}
                          onChange={(e) => setQuickContact({ ...quickContact, email: e.target.value })}
                          placeholder="contact@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1">
                          Required Service
                        </label>
                        <select
                          value={quickContact.service}
                          onChange={(e) => setQuickContact({ ...quickContact, service: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none transition-colors"
                        >
                          {services.map(s => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1">
                        Project Specifications & Quantity
                      </label>
                      <textarea
                        rows={3}
                        value={quickContact.message}
                        onChange={(e) => setQuickContact({ ...quickContact, message: e.target.value })}
                        placeholder="State your required quantity, target date, preferred paper stock, foil color, or custom apparel sizes..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onOpenQuote()}
                        className="text-xs font-semibold text-[#1f66a8] hover:text-[#0f2a4a] transition-colors"
                      >
                        Open Detailed Modal Form
                      </button>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#0f2a4a] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#15b498] transition-all shadow-md hover:scale-105 active:scale-95"
                      >
                        Submit Inquiry
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION K: BLOGS & INSIGHTS (Editorial Journal)
          ========================================================= */}
      <section className="py-24 bg-[#f7f9fc] border-t border-[#dbe4ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <motion.div variants={fadeLeft} className="max-w-2xl space-y-2.5">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
                <span className="whitespace-nowrap text-[1.1rem] sm:text-3xl lg:text-4xl">Printing Guides & <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Industry Insights</span></span>
              </h2>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="h-[2px] w-10 bg-[#15b498] rounded-full"></span>
                <span className="h-px w-6 bg-[#dbe4ee] rounded-full"></span>
              </div>
            </motion.div>

            <motion.div variants={fadeRight}>
              <Link
                to="/blogs"
                className="text-xs font-bold uppercase tracking-widest text-[#0f2a4a] hover:text-[#1f66a8] inline-flex items-center gap-1.5 transition-colors border-b-2 border-[#0f2a4a] hover:border-[#1f66a8] pb-1 w-max"
              >
                <span>Explore All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {blogs.slice(0, 3).map((blog, idx) => (
              <motion.article
                key={blog.id}
                custom={idx}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group flex flex-col justify-between bg-white rounded-3xl border border-[#dbe4ee] hover:border-[#1f66a8] overflow-hidden transition-all duration-300 hover:shadow-premium"
              >
                <div className="relative aspect-[16/10] bg-[#0f2a4a] overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    onError={(e) => { e.currentTarget.src = blog.backupImage; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold uppercase tracking-widest text-[#0f2a4a]">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] text-[#56667a]">
                      {blog.formattedDate} • {blog.readTime}
                    </span>
                    <Link to={`/blogs/${blog.slug}`}>
                      <h3 className="font-serif text-lg font-bold text-[#0f2a4a] group-hover:text-[#1f66a8] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#56667a] line-clamp-1 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#edf3f9] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-medium text-[#0f2a4a]">
                        {blog.author.name}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedHomeBlog(blog)}
                      className="text-xs font-semibold text-[#1f66a8] hover:text-[#0f2a4a] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {selectedHomeBlog && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedHomeBlog.title} preview`}
          onClick={() => setSelectedHomeBlog(null)}
        >
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-[#dbe4ee] p-6 sm:p-8" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-[#edf3f9] pb-5">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#1f66a8]">{selectedHomeBlog.category}</span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#0f2a4a]">{selectedHomeBlog.title}</h3>
                <p className="mt-1 text-xs text-[#56667a]">{selectedHomeBlog.formattedDate} · {selectedHomeBlog.readTime}</p>
              </div>
              <button type="button" onClick={() => setSelectedHomeBlog(null)} aria-label="Close preview" className="p-2 rounded-full text-[#56667a] hover:bg-[#edf3f9]"><X className="w-5 h-5" /></button>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[#56667a]">{selectedHomeBlog.excerpt}</p>
            <div className="mt-7 border-t border-[#edf3f9] pt-5">
              <Link to={`/blogs/${selectedHomeBlog.slug}`} onClick={() => setSelectedHomeBlog(null)} className="inline-flex items-center gap-2 rounded-full bg-[#0f2a4a] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#1f66a8]">
                Read Full Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

