import React, { useState } from 'react';
import { Eye, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import PageHero from '../components/PageHero';
import BrandStrip from '../components/BrandStrip';
import { portfolioItems, portfolioCategories } from '../data/portfolio';

export default function Portfolio({ onOpenLightbox, onOpenQuote }) {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredItems = portfolioItems.filter(item => {
    if (activeCategory === "All Projects") return true;
    return item.category === activeCategory;
  });

  return (
    <div>
      <PageHero
        badge="Case Archives"
        title="Physical Artifacts for"
        highlight="Discerning Institutions"
        subtitle="A visual audit of verified commissions produced for Vistara, Air India, NTPC, Radisson, and leading corporate partners."
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
                className="group rounded-3xl bg-white border border-[#dbe4ee] hover:border-[#1f66a8] overflow-hidden transition-all duration-300 hover:shadow-premium hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Visual Area */}
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

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-5 py-2.5 rounded-full bg-white text-[#0f2a4a] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xl">
                      <Eye className="w-4 h-4 text-[#1f66a8]" />
                      <span>Inspect Details</span>
                    </span>
                  </div>

                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                    {item.category}
                  </div>

                  <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#0f2a4a]">
                    {item.year}
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#1f66a8] block">
                      Client: {item.client}
                    </span>

                    <h3 
                      onClick={() => onOpenLightbox(item)}
                      className="font-serif text-xl font-bold text-[#0f2a4a] group-hover:text-[#1f66a8] transition-colors cursor-pointer"
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#56667a] leading-relaxed line-clamp-2">
                      {item.scope}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#edf3f9] flex items-center justify-between">
                    <button
                      onClick={() => onOpenLightbox(item)}
                      className="text-xs font-semibold text-[#0f2a4a] hover:text-[#1f66a8] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Full Case File</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenQuote(item.title)}
                      className="text-xs font-semibold text-[#1f66a8] hover:text-[#0f2a4a] uppercase tracking-wider"
                    >
                      Commission Similar
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

