import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Cpu
} from 'lucide-react';
import { company } from '../data/company';
import { products, productCategories } from '../data/products';
import { services } from '../data/services';
import { portfolioItems } from '../data/portfolio';
import { blogs } from '../data/blogs';
import BrandStrip from '../components/BrandStrip';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';

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
      case 'Palette': return <Palette className="w-6 h-6 text-[#b8860b]" />;
      case 'Award': return <Award className="w-6 h-6 text-[#b8860b]" />;
      case 'Zap': return <Zap className="w-6 h-6 text-[#b8860b]" />;
      case 'Clock': return <Clock className="w-6 h-6 text-[#b8860b]" />;
      default: return <Printer className="w-6 h-6 text-[#b8860b]" />;
    }
  };

  return (
    <div className="overflow-hidden">
      {/* =========================================================
          SECTION B: CINEMATIC HERO SECTION
          ========================================================= */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 bg-gradient-to-b from-[#f4f1ea] via-[#faf8f5] to-[#faf8f5] overflow-hidden">
        {/* Subtle Architectural Grain Background */}
        <div className="absolute inset-0 bg-grain opacity-70 pointer-events-none"></div>

        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-[#c59b27]/8 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Narrative */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Prestige Studio Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e4e2dd] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#c59b27] animate-pulse"></span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#18191b]">
                  Swiss Color Fidelity • New Delhi Production Studio
                </span>
              </div>

              {/* Editorial Master Headline */}
              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-extrabold text-[#18191b] tracking-tight leading-[1.02]">
                  WE DON'T JUST PRINT. <br />
                  <span className="gold-gradient-text italic font-normal">WE CREATE</span> IMPRESSIONS.
                </h1>
              </div>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#686a71] leading-relaxed max-w-xl font-normal">
                {company.subTagline} Serving corporate pioneers, aviation fleets, and luxury brand houses with masterfully engineered paper, packaging, apparel, and signage.
              </p>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-8 py-4 rounded-full bg-[#18191b] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#c59b27] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2 group"
                >
                  <span>Explore Our Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={() => onOpenQuote()}
                  className="px-8 py-4 rounded-full bg-white text-[#18191b] text-xs font-bold uppercase tracking-widest border border-[#e4e2dd] hover:border-[#b8860b] hover:bg-[#faf8f5] transition-all duration-300 shadow-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#b8860b]" />
                  <span>Request a Quote</span>
                </button>
              </div>

              {/* Micro Trust Indicators */}
              <div className="pt-6 border-t border-[#e4e2dd]/80 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="font-serif font-bold text-lg text-[#18191b]">15+ Years</div>
                  <div className="text-[11px] text-[#686a71]">Production Heritage</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-lg text-[#18191b]">1,000+</div>
                  <div className="text-[11px] text-[#686a71]">Verified Brands</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-lg text-[#18191b]">99.8%</div>
                  <div className="text-[11px] text-[#686a71]">SLA On-Time Dispatch</div>
                </div>
              </div>
            </div>

            {/* Right Column: Layered Editorial Product Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-white p-3 sm:p-4 shadow-2xl border border-[#e4e2dd]">
                {/* Main Showcase Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#18191b]">
                  <img
                    src={heroShowcases[heroTab].image}
                    alt={heroShowcases[heroTab].title}
                    onError={(e) => { e.currentTarget.src = heroShowcases[heroTab].backupImage; }}
                    className="w-full h-full object-cover transition-all duration-700 ease-out"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Active Showcase Pill */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-[#18191b]">
                    {heroShowcases[heroTab].tag}
                  </div>

                  {/* Active Showcase Info */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">
                      {heroShowcases[heroTab].title}
                    </h3>
                    <p className="text-xs text-white/80 mt-1 line-clamp-2">
                      {heroShowcases[heroTab].desc}
                    </p>
                  </div>
                </div>

                {/* Interactive Thumbnail Selector Tabs */}
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {heroShowcases.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroTab(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        heroTab === idx 
                          ? 'border-[#c59b27] scale-95 shadow-md' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={(e) => { e.currentTarget.src = item.backupImage; }}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Subtitle Under Selector */}
                <div className="mt-3 pt-3 border-t border-[#eceae5] flex items-center justify-between text-xs text-[#686a71]">
                  <span className="flex items-center gap-1 font-medium">
                    <Layers className="w-3.5 h-3.5 text-[#b8860b]" />
                    Interactive Atelier Showcase
                  </span>
                  <button
                    onClick={() => onOpenQuote(heroShowcases[heroTab].title)}
                    className="font-semibold text-[#18191b] hover:text-[#b8860b] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Inquire Now</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
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
      <section className="py-20 bg-[#faf8f5] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold">
              The Ganesha Production Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18191b]">
              Why Leading Enterprises Entrust Their Brand to Us
            </h2>
            <p className="text-sm sm:text-base text-[#686a71]">
              Every project is treated as a strategic tactile artifact. We combine Swiss-grade color calibration with precision industrial finishing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {company.valueProps.map((prop, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-[#e4e2dd] hover:border-[#b8860b] shadow-subtle hover:shadow-premium transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#f4f1ea] group-hover:bg-[#faf8f5] flex items-center justify-center transition-colors">
                    {getIcon(prop.icon)}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#18191b] group-hover:text-[#b8860b] transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-[#686a71] leading-relaxed">
                    {prop.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f4f1ea] flex items-center gap-1.5 text-xs font-semibold text-[#18191b]">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION D: FEATURED PRODUCTS SHOWCASE (Editorial Grid)
          ========================================================= */}
      <section className="py-24 bg-[#f4f1ea]/60 border-y border-[#e4e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold">
                Signature Artifacts
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18191b]">
                Curated Corporate Collection
              </h2>
              <p className="text-sm text-[#686a71]">
                From boardroom-ready visiting cards and employee welcome kits to heavy pique polos and roll-up standees.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#18191b] hover:text-[#b8860b] transition-colors border-b-2 border-[#18191b] hover:border-[#b8860b] pb-1 w-max"
            >
              <span>View All 90+ Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Editorial Asymmetric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.slice(0, 8).map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuoteRequest={onOpenQuote}
                priority={idx < 4}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION E: ABOUT GANESHA ENTERPRISES (Visual Storytelling)
          ========================================================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Imagery Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#18191b] aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop"
                  alt="Ganesha Enterprises Workshop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#c59b27] font-semibold">
                    Plant Overview • Naraina Phase 1
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-1">
                    Where Industrial Scale Meets Artisanal Precision
                  </h3>
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-[#faf8f5] p-5 rounded-2xl border border-[#e4e2dd] shadow-xl max-w-xs hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#c59b27] text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-[#18191b]">MSME & ISO Certified</h5>
                    <p className="text-[11px] text-[#686a71]">Zero Compromise QA Process</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Storytelling Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold">
                About Ganesha Enterprises
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18191b] tracking-tight leading-tight">
                Architecting Tactile Brand Excellence Since 2011.
              </h2>

              <p className="text-sm sm:text-base text-[#686a71] leading-relaxed">
                At Ganesha Enterprises, we specialize in professional digital printing solutions that combine quality, speed, and creativity — all without stretching your budget. Whether you’re a high-growth startup, an airline pioneer, or a multinational enterprise, we deliver customized print solutions that bring your brand identity to life.
              </p>

              <p className="text-sm sm:text-base text-[#686a71] leading-relaxed">
                With state-of-the-art machinery, skilled master printers, and an obsession with detail, we handle everything from heavy cotton pulp cardstock to vinyl manifestations, corporate uniforms, and large-format architectural branding.
              </p>

              {/* Capabilities Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-[#18191b]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
                  <span>Pantone® Ink Calibration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
                  <span>High-DPI Japanese UV Flatbeds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
                  <span>Sculpted Brass Foil Embossing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
                  <span>Doorstep Pan-India Logistics</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-full bg-[#18191b] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#c59b27] transition-all duration-300 shadow-md inline-flex items-center gap-2"
                >
                  <span>Read Full Heritage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="text-xs font-semibold text-[#18191b] hover:text-[#b8860b] transition-colors"
                >
                  Schedule Plant Tour
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION F: OUR SERVICES (Comprehensive Printing Services)
          ========================================================= */}
      <section className="py-24 bg-[#faf8f5] border-t border-[#e4e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold">
              Comprehensive Production Capabilities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18191b]">
              Turnkey Industrial Printing Services
            </h2>
            <p className="text-sm sm:text-base text-[#686a71]">
              Equipped for extreme volume, fine art precision, and rapid emergency turnarounds under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onQuoteRequest={onOpenQuote}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-[#e4e2dd] text-[#18191b] hover:border-[#b8860b] hover:text-[#b8860b] text-xs font-bold uppercase tracking-widest shadow-xs transition-all"
            >
              <span>Explore All 8 Specialized Service Divisions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION G: PRODUCT CATEGORIES (Discovery Showcase)
          ========================================================= */}
      <section className="py-24 bg-[#f4f1ea] border-t border-[#e4e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold">
                Catalog Navigation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18191b]">
                Explore by Product Category
              </h2>
              <p className="text-sm text-[#686a71]">
                Engineered for rapid corporate procurement and tailored bespoke merchandise curation.
              </p>
            </div>

            <Link
              to="/products"
              className="text-xs font-bold uppercase tracking-widest text-[#18191b] hover:text-[#b8860b] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Browse All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.filter(c => c.id !== 'all').map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="group p-8 rounded-3xl bg-white border border-[#e4e2dd] hover:border-[#b8860b] shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-[#b8860b]">
                      {cat.count} Products Available
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#686a71] group-hover:text-[#b8860b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#18191b] group-hover:text-[#b8860b] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#686a71] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f4f1ea]">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories?.slice(0, 4).map((sub, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-[#faf8f5] text-[10px] text-[#686a71] font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION I: PORTFOLIO — OUR RECENT WORK (Agency Gallery)
          ========================================================= */}
      <section className="py-24 bg-white border-t border-[#e4e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold">
                Proven Track Record
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18191b]">
                Recent Client Commissions
              </h2>
              <p className="text-sm text-[#686a71]">
                Authentic projects produced for Vistara, NTPC, Air India, Radisson, and prominent corporate networks.
              </p>
            </div>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#18191b] hover:text-[#b8860b] transition-colors border-b-2 border-[#18191b] hover:border-[#b8860b] pb-1 w-max"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Project Grid with Lightbox Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPortfolio.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-[#faf8f5] border border-[#e4e2dd] hover:border-[#b8860b] overflow-hidden transition-all duration-300 hover:shadow-premium flex flex-col justify-between"
              >
                <div 
                  className="relative aspect-[4/3] bg-[#18191b] overflow-hidden cursor-pointer"
                  onClick={() => onOpenLightbox(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => { e.currentTarget.src = item.backupImage; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white text-[#18191b] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-[#b8860b]" />
                      <span>Inspect Artwork</span>
                    </span>
                  </div>

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold uppercase tracking-widest text-white border border-white/10">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#b8860b] font-medium">
                    <span>Client: {item.client}</span>
                    <span>{item.year}</span>
                  </div>

                  <h3 
                    onClick={() => onOpenLightbox(item)}
                    className="font-serif text-lg font-bold text-[#18191b] group-hover:text-[#b8860b] transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#686a71] line-clamp-2 leading-relaxed">
                    {item.scope}
                  </p>

                  <div className="pt-3 border-t border-[#eceae5] flex items-center justify-between">
                    <button
                      onClick={() => onOpenLightbox(item)}
                      className="text-xs font-semibold text-[#18191b] hover:text-[#b8860b] inline-flex items-center gap-1"
                    >
                      <span>View Case File</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onOpenQuote(item.title)}
                      className="text-xs font-semibold text-[#b8860b] hover:text-[#18191b]"
                    >
                      Quote Similar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION J: CONTACT & DIRECT QUOTE SECTION
          ========================================================= */}
      <section className="py-24 bg-[#18191b] text-white relative overflow-hidden">
        {/* Subtle Ambient Radial Light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c59b27]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Contact Details & Business Positioning */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#c59b27] font-semibold">
                Direct Studio Dialogue
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Give Us a Printing Deal for Your Enterprise.
              </h2>

              <p className="text-sm text-white/70 leading-relaxed">
                Connect directly with Vineet and our production leads at the Naraina Industrial Area plant. We provide custom substrate swatch samples, rapid digital color proofs, and firm SLA guarantees for orders throughout India.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs text-white/80">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-[#c59b27] font-semibold">Primary Facility & Address:</div>
                  <p className="font-medium text-white">{company.contact.address.full}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#c59b27] font-semibold">Direct Mobile / Call:</div>
                    <a href={`tel:${company.contact.phone.replace(/[^0-9]/g, '')}`} className="font-medium text-white hover:text-[#c59b27] block">
                      {company.contact.phoneDisplay}
                    </a>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#c59b27] font-semibold">Official Inquiries:</div>
                    <a href={`mailto:${company.contact.email}`} className="font-medium text-white hover:text-[#c59b27] block">
                      {company.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={company.contact.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#20ba5a] transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Immediately on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Request a Quote Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-[#faf8f5] text-[#18191b] p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#e4e2dd]">
                <div className="space-y-2 mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#b8860b]">
                    Fast Turnaround Quote
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#18191b]">
                    Request a Custom Project Estimate
                  </h3>
                  <p className="text-xs text-[#686a71]">
                    Fill in your project requirements. Stored locally with immediate confirmation.
                  </p>
                </div>

                {quickSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-serif text-xl font-bold text-[#18191b]">Request Submitted Successfully</h4>
                    <p className="text-xs text-[#686a71]">
                      Thank you, <strong>{quickContact.name}</strong>. Your inquiry has been stored locally. You can also reach our plant manager directly on WhatsApp.
                    </p>
                    <button
                      onClick={() => setQuickSubmitted(false)}
                      className="px-5 py-2 rounded-full bg-[#18191b] text-white text-xs font-semibold"
                    >
                      Submit Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#18191b] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={quickContact.name}
                          onChange={(e) => setQuickContact({ ...quickContact, name: e.target.value })}
                          placeholder="e.g. Vikram Singhania"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e4e2dd] text-xs text-[#18191b] focus:border-[#b8860b] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#18191b] mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={quickContact.phone}
                          onChange={(e) => setQuickContact({ ...quickContact, phone: e.target.value })}
                          placeholder="+91 96500 44234"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e4e2dd] text-xs text-[#18191b] focus:border-[#b8860b] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#18191b] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={quickContact.email}
                          onChange={(e) => setQuickContact({ ...quickContact, email: e.target.value })}
                          placeholder="contact@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e4e2dd] text-xs text-[#18191b] focus:border-[#b8860b] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#18191b] mb-1">
                          Required Service
                        </label>
                        <select
                          value={quickContact.service}
                          onChange={(e) => setQuickContact({ ...quickContact, service: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e4e2dd] text-xs text-[#18191b] focus:border-[#b8860b] focus:outline-none"
                        >
                          {services.map(s => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#18191b] mb-1">
                        Project Specifications & Quantity
                      </label>
                      <textarea
                        rows={3}
                        value={quickContact.message}
                        onChange={(e) => setQuickContact({ ...quickContact, message: e.target.value })}
                        placeholder="State your required quantity, target date, preferred paper stock, foil color, or custom apparel sizes..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e4e2dd] text-xs text-[#18191b] focus:border-[#b8860b] focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onOpenQuote()}
                        className="text-xs font-semibold text-[#b8860b] hover:text-[#18191b] transition-colors"
                      >
                        Open Detailed Modal Form
                      </button>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#18191b] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#c59b27] transition-all shadow-md"
                      >
                        Submit Inquiry
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION K: BLOGS & INSIGHTS (Editorial Journal)
          ========================================================= */}
      <section className="py-24 bg-[#faf8f5] border-t border-[#e4e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold">
                Journal & Industry Insights
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18191b]">
                The Craft of Tactile Impressions
              </h2>
              <p className="text-sm text-[#686a71]">
                Master printer articles on color theory, sustainable materials, retail merchandise, and corporate branding.
              </p>
            </div>

            <Link
              to="/blogs"
              className="text-xs font-bold uppercase tracking-widest text-[#18191b] hover:text-[#b8860b] inline-flex items-center gap-1.5 transition-colors border-b-2 border-[#18191b] hover:border-[#b8860b] pb-1 w-max"
            >
              <span>Explore All 6 Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog) => (
              <article
                key={blog.id}
                className="group flex flex-col justify-between bg-white rounded-3xl border border-[#e4e2dd] hover:border-[#b8860b] overflow-hidden transition-all duration-300 hover:shadow-premium hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] bg-[#18191b] overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    onError={(e) => { e.currentTarget.src = blog.backupImage; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold uppercase tracking-widest text-[#18191b]">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] text-[#686a71]">
                      {blog.formattedDate} • {blog.readTime}
                    </span>
                    <Link to={`/blogs/${blog.slug}`}>
                      <h3 className="font-serif text-lg font-bold text-[#18191b] group-hover:text-[#b8860b] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#686a71] line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f4f1ea] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-medium text-[#18191b]">
                        {blog.author.name}
                      </span>
                    </div>

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="text-xs font-semibold text-[#b8860b] hover:text-[#18191b] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

