import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
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
  Pause
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

// ── Animation Variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }
  })
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
      backupImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop",
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

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickContact.name || !quickContact.phone) return;
    setQuickSubmitted(true);
  };

  const getIcon = (name) => {
    switch (name) {
      case 'Palette': return <Palette className="w-6 h-6 text-[#1f66a8]" />;
      case 'Award': return <Award className="w-6 h-6 text-[#1f66a8]" />;
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
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Fullscreen Background Video */}
        <div className="absolute inset-0 z-0">
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f2a4a]/75 via-[#0f2a4a]/60 to-[#0f2a4a]/80"></div>
          {/* Warm golden tint overlay */}
          <div className="absolute inset-0 bg-[#15b498]/5 mix-blend-overlay"></div>
          {/* Bottom fade to the next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f7f9fc] to-transparent"></div>
        </div>

        {/* Subtle Architectural Grain Background */}
        <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none z-[1]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Narrative */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Prestige Studio Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
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
                <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.02] drop-shadow-lg">
                  WE DON'T JUST PRINT. <br />
                  <span className="brand-gradient-text italic font-normal">WE CREATE</span> IMPRESSIONS.
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
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  to="/products"
                  className="px-8 py-4 rounded-full bg-[#1f66a8] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#19558f] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2 group"
                >
                  <span>Explore Our Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={() => onOpenQuote()}
                  className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest border border-white/25 hover:border-[#15b498] hover:bg-white/15 transition-all duration-300 shadow-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#15b498]" />
                  <span>Request a Quote</span>
                </button>
              </motion.div>

              {/* Micro Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-xs"
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
            <div className="lg:col-span-5 relative">
              {/* Ambient golden orb glow behind the card stack */}
              <div className="absolute -inset-8 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#15b498]/10 blur-[80px] animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-[#15b498]/20 animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-[#15b498]/10 animate-[spin_30s_linear_infinite_reverse]"></div>
              </div>

              <div className="relative z-10" style={{ perspective: '1200px' }}>
                {/* Stacked card deck with 3D tilt */}
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4]">
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
                            <div className={`absolute bottom-0 left-0 right-0 p-6 sm:p-8 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
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
                                  <Sparkles className="w-3.5 h-3.5" />
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
                        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                          idx === heroTab 
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
      <section className="py-20 bg-[#f7f9fc] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16 space-y-3"
          >
            <motion.span variants={fadeUp} className="text-xs uppercase tracking-widest text-[#1f66a8] font-semibold block">
              The Ganesha Production Standard
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f2a4a]">
              Why Leading Enterprises Entrust Their Brand to Us
            </motion.h2>
            {/* <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#56667a]">
              Every project is treated as a strategic tactile artifact. We combine Swiss-grade color calibration with precision industrial finishing.
            </motion.p> */}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {company.valueProps.map((prop, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="p-8 rounded-3xl bg-white border border-[#dbe4ee] hover:border-[#1f66a8] shadow-subtle hover:shadow-premium transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 rounded-2xl bg-[#edf3f9] group-hover:bg-[#f7f9fc] flex items-center justify-center transition-colors"
                  >
                    {getIcon(prop.icon)}
                  </motion.div>
                  <h3 className="font-serif text-xl font-bold text-[#0f2a4a] group-hover:text-[#1f66a8] transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-[#56667a] leading-relaxed">
                    {prop.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#edf3f9] flex items-center gap-1.5 text-xs font-semibold text-[#0f2a4a]">
                  <CheckCircle2 className="w-4 h-4 text-[#1f66a8]" />
                  <span>Quality Guaranteed</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION D: FEATURED PRODUCTS SHOWCASE (Editorial Grid)
          ========================================================= */}
      <section className="py-24 bg-[#edf3f9]/60 border-y border-[#dbe4ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <motion.div variants={fadeLeft} className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#1f66a8] font-semibold">
                Signature Artifacts
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f2a4a]">
                Curated Corporate Collection
              </h2>
              {/* <p className="text-sm text-[#56667a]">
                From boardroom-ready visiting cards and employee welcome kits to heavy pique polos and roll-up standees.
              </p> */}
            </motion.div>

            <motion.div variants={fadeRight}>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0f2a4a] hover:text-[#1f66a8] transition-colors border-b-2 border-[#0f2a4a] hover:border-[#1f66a8] pb-1 w-max"
              >
                <span>View All 90+ Products</span>
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
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Imagery Composition */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeLeft}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#0f2a4a] aspect-[4/3] group">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop"
                  alt="Ganesha Enterprises Workshop"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#15b498] font-semibold">
                    Plant Overview • Naraina Phase 1
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-1">
                    Where Industrial Scale Meets Artisanal Precision
                  </h3>
                </div>
              </div>

              {/* Floating Stat Card with subtle bounce animation */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 -right-4 sm:-right-8 bg-[#f7f9fc] p-5 rounded-2xl border border-[#dbe4ee] shadow-xl max-w-xs hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1f66a8] text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-[#0f2a4a]">MSME & ISO Certified</h5>
                    <p className="text-[11px] text-[#56667a]">Zero Compromise QA Process</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Storytelling Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="lg:col-span-6 space-y-6"
            >
              <motion.span variants={fadeUp} className="text-xs uppercase tracking-widest text-[#1f66a8] font-semibold block">
                About Ganesha Enterprises
              </motion.span>

              <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
                Architecting Tactile Brand Excellence Since 2011.
              </motion.h2>

              <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#56667a] leading-relaxed">
                At Ganesha Enterprises, we specialize in professional digital printing solutions that combine quality, speed, and creativity — all without stretching your budget. Whether you’re a high-growth startup, an airline pioneer, or a multinational enterprise, we deliver customized print solutions that bring your brand identity to life.
              </motion.p>

              {/* <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#56667a] leading-relaxed">
                With state-of-the-art machinery, skilled master printers, and an obsession with detail, we handle everything from heavy cotton pulp cardstock to vinyl manifestations, corporate uniforms, and large-format architectural branding.
              </motion.p> */}

              {/* Capabilities Checkmarks */}
              <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-[#0f2a4a]">
                {[
                  'Pantone® Ink Calibration',
                  'High-DPI Japanese UV Flatbeds',
                  'Sculpted Brass Foil Embossing',
                  'Doorstep Pan-India Logistics'
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1f66a8] shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="pt-4 flex items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-full bg-[#0f2a4a] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#15b498] transition-all duration-300 shadow-md inline-flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <span>Read Full Heritage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="text-xs font-semibold text-[#0f2a4a] hover:text-[#1f66a8] transition-colors"
                >
                  Schedule Plant Tour
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION F: OUR SERVICES (Comprehensive Printing Services)
          ========================================================= */}
      <section className="py-24 bg-[#f7f9fc] border-t border-[#dbe4ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16 space-y-3"
          >
            <motion.span variants={fadeUp} className="text-xs uppercase tracking-widest text-[#1f66a8] font-semibold block">
              Comprehensive Production Capabilities
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f2a4a]">
              Turnkey Industrial Printing Services
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#56667a]">
              Equipped for extreme volume, fine art precision, and rapid emergency turnarounds under one roof.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.slice(0, 6).map((service, idx) => (
              <motion.div
                key={service.id}
                custom={idx}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
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
              <span>Explore All 8 Specialized Service Divisions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION G: PRODUCT CATEGORIES (Discovery Showcase)
          ========================================================= */}
      <section className="py-24 bg-[#edf3f9] border-t border-[#dbe4ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <motion.div variants={fadeLeft} className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#1f66a8] font-semibold">
                Catalog Navigation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f2a4a]">
                Explore by Product Category
              </h2>
              <p className="text-sm text-[#56667a]">
                Engineered for rapid corporate procurement and tailored bespoke merchandise curation.
              </p>
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {productCategories.filter(c => c.id !== 'all').map((cat, idx) => (
              <motion.div
                key={cat.id}
                custom={idx}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Link
                  to={`/products?category=${cat.id}`}
                  className="group p-8 rounded-3xl bg-white border border-[#dbe4ee] hover:border-[#1f66a8] shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-widest font-semibold text-[#1f66a8]">
                        {cat.count} Products Available
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#56667a] group-hover:text-[#1f66a8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#0f2a4a] group-hover:text-[#1f66a8] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#56667a] leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#edf3f9]">
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories?.slice(0, 4).map((sub, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-[#f7f9fc] text-[10px] text-[#56667a] font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <motion.div variants={fadeLeft} className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#1f66a8] font-semibold">
                Proven Track Record
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f2a4a]">
                Recent Client Commissions
              </h2>
              <p className="text-sm text-[#56667a]">
                Authentic projects produced for Vistara, NTPC, Air India, Radisson, and prominent corporate networks.
              </p>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredPortfolio.map((item, idx) => (
              <motion.div
                key={item.id}
                custom={idx}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group rounded-3xl bg-[#f7f9fc] border border-[#dbe4ee] hover:border-[#1f66a8] overflow-hidden transition-all duration-300 hover:shadow-premium flex flex-col justify-between"
              >
                <div 
                  className="relative aspect-[4/3] bg-[#0f2a4a] overflow-hidden cursor-pointer"
                  onClick={() => onOpenLightbox(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => { e.currentTarget.src = item.backupImage; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white text-[#0f2a4a] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-3.5 h-3.5 text-[#1f66a8]" />
                      <span>Inspect Artwork</span>
                    </span>
                  </div>

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold uppercase tracking-widest text-white border border-white/10">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#1f66a8] font-medium">
                    <span>Client: {item.client}</span>
                    <span>{item.year}</span>
                  </div>

                  <h3 
                    onClick={() => onOpenLightbox(item)}
                    className="font-serif text-lg font-bold text-[#0f2a4a] group-hover:text-[#1f66a8] transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#56667a] line-clamp-2 leading-relaxed">
                    {item.scope}
                  </p>

                  <div className="pt-3 border-t border-[#e6edf5] flex items-center justify-between">
                    <button
                      onClick={() => onOpenLightbox(item)}
                      className="text-xs font-semibold text-[#0f2a4a] hover:text-[#1f66a8] inline-flex items-center gap-1"
                    >
                      <span>View Case File</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onOpenQuote(item.title)}
                      className="text-xs font-semibold text-[#1f66a8] hover:text-[#0f2a4a]"
                    >
                      Quote Similar
                    </button>
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
      <section className="py-24 bg-[#0f2a4a] text-white relative overflow-hidden">
        {/* Subtle Ambient Radial Light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#15b498]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Contact Details & Business Positioning */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="lg:col-span-5 space-y-6"
            >
              <motion.span variants={fadeUp} className="text-xs uppercase tracking-widest text-[#15b498] font-semibold block">
                Direct Studio Dialogue
              </motion.span>

              <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Give Us a Printing Deal for Your Enterprise.
              </motion.h2>

              <motion.p variants={fadeUp} className="text-sm text-white/70 leading-relaxed">
                Connect directly with Vineet and our production leads at the Naraina Industrial Area plant. We provide custom substrate swatch samples, rapid digital color proofs, and firm SLA guarantees for orders throughout India.
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
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeRight}
              className="lg:col-span-7"
            >
              <div className="bg-[#f7f9fc] text-[#0f2a4a] p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#dbe4ee]">
                <div className="space-y-2 mb-6">
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
                  <form onSubmit={handleQuickSubmit} className="space-y-4">
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
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <motion.div variants={fadeLeft} className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#1f66a8] font-semibold">
                Journal & Industry Insights
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f2a4a]">
                The Craft of Tactile Impressions
              </h2>
              <p className="text-sm text-[#56667a]">
                Master printer articles on color theory, sustainable materials, retail merchandise, and corporate branding.
              </p>
            </motion.div>

            <motion.div variants={fadeRight}>
              <Link
                to="/blogs"
                className="text-xs font-bold uppercase tracking-widest text-[#0f2a4a] hover:text-[#1f66a8] inline-flex items-center gap-1.5 transition-colors border-b-2 border-[#0f2a4a] hover:border-[#1f66a8] pb-1 w-max"
              >
                <span>Explore All 6 Articles</span>
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
                    <p className="text-xs text-[#56667a] line-clamp-3 leading-relaxed">
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

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="text-xs font-semibold text-[#1f66a8] hover:text-[#0f2a4a] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

