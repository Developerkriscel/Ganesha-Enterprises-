import React, { useState } from 'react';
import { Eye, ArrowUpRight, Filter } from 'lucide-react';
import PageHero from '../components/PageHero';
import BrandStrip from '../components/BrandStrip';
import { portfolioItems, portfolioCategories } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';

export default function Portfolio({ onOpenLightbox, onOpenQuote }) {
  const { tr } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredItems = portfolioItems.filter(item => {
    if (activeCategory === "All Projects") return true;
    return item.category === activeCategory;
  });

  return (
    <div>
      <PageHero
        badge="Client Work & Projects"
        title="Featured Projects for"
        highlight="Leading Brands & Enterprises"
        subtitle="Explore completed printing and branding projects delivered for Vistara, Air India, NTPC, Radisson, and corporate partners across India."
        breadcrumbs={[{ name: 'Portfolio' }]}
      />

      <section className="py-16 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#0f2a4a] text-white shadow-md'
                    : 'bg-white border border-[#dbe4ee] text-[#56667a] hover:text-[#0f2a4a] hover:border-[#1f66a8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className="group rounded-2xl sm:rounded-3xl bg-white border border-[#dbe4ee] hover:border-[#15b498] overflow-hidden transition-all duration-350 ease-out hover:scale-[1.035] sm:hover:scale-[1.045] hover:-translate-y-2 hover:shadow-[0_24px_50px_-10px_rgba(15,42,74,0.22),0_10px_20px_-5px_rgba(21,180,152,0.2)] flex flex-col justify-between relative z-10 hover:z-30 will-change-transform"
              >
                {/* Top subtle ambient glowing line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#15b498]/0 to-transparent group-hover:via-[#15b498] transition-all duration-500 z-30"></div>

                {/* Light sweep shimmer effect */}
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                  <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                </div>

                {/* Compact Visual Area */}
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
                    {tr(item.category)}
                  </div>

                  <div className="absolute bottom-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[9.5px] font-bold text-[#0f2a4a]">
                    {item.year}
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-4 sm:p-4.5 space-y-1.5 flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-[#fafcff]">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1f66a8] block">
                      {tr('Client')}: {tr(item.client)}
                    </span>

                    <h3 
                      onClick={() => onOpenLightbox(item)}
                      className="font-serif text-[15px] sm:text-base font-bold text-[#0f2a4a] group-hover:text-[#1f66a8] transition-colors cursor-pointer line-clamp-1 leading-snug"
                    >
                      {tr(item.title)}
                    </h3>
                  </div>

                  <div className="pt-2.5 border-t border-[#edf3f9] flex items-center justify-between">
                    <button
                      onClick={() => onOpenLightbox(item)}
                      className="text-[11px] font-bold text-[#0f2a4a] hover:text-[#1f66a8] inline-flex items-center gap-1 transition-colors cursor-pointer py-1 group/link"
                    >
                      <span>{tr('View Details')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform text-[#15b498]" />
                    </button>

                    <button
                      onClick={() => onOpenQuote(item.title)}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-[#1f66a8] to-[#15b498] hover:from-[#15b498] hover:to-[#1f66a8] text-white text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      {tr('Commission Similar')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrandStrip title="Enterprise Organizations Relying on Ganesha Output" />
    </div>
  );
}

