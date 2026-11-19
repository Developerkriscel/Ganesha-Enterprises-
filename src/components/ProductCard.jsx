import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MessageSquare, X, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProductCard({ product, onQuoteRequest, priority = false }) {
  const [imgSrc, setImgSrc] = useState(product.image);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { tr } = useLanguage();

  useEffect(() => {
    if (!detailsOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setDetailsOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [detailsOpen]);

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-3xl border border-[#dbe4ee]/80 hover:border-[#15b498] transition-all duration-350 ease-out shadow-[0_4px_20px_rgba(15,42,74,0.04)] hover:shadow-[0_25px_50px_-10px_rgba(15,42,74,0.25),0_0_25px_rgba(21,180,152,0.22)] hover:-translate-y-2.5 hover:scale-[1.05] sm:hover:scale-[1.07] z-10 hover:z-40 overflow-hidden will-change-transform">
      {/* Light sweep shimmer effect */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
      </div>

      {/* Top subtle ambient glowing line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#15b498]/0 to-transparent group-hover:via-[#15b498] transition-all duration-500 z-30"></div>

      {/* Image Area - Clean & Unobstructed */}
      <Link to={`/products/${product.slug}`} className="relative aspect-[4/3] bg-gradient-to-br from-[#edf3f9] to-[#e2eaf2] overflow-hidden block cursor-pointer">
        <img
          src={imgSrc}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          draggable={false}
          onError={() => setImgSrc(product.backupImage)}
          className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-500 ease-out select-none pointer-events-none"
        />
      </Link>

      {/* Content Area - Compact Refined Sizing */}
      <div className="p-4 sm:p-4.5 flex flex-col flex-grow justify-between bg-gradient-to-b from-white to-[#fafcff]">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[9.5px] uppercase tracking-widest font-bold text-[#1f66a8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15b498]"></span>
              {tr(product.categoryName)}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#edf3f9] text-[#1f66a8] text-[9.5px] font-semibold border border-[#dbe4ee]/60">
              <Clock className="w-2.5 h-2.5 text-[#1f66a8]" />
              {product.turnaround}
            </span>
          </div>

          <Link to={`/products/${product.slug}`} className="block">
            <h3 className="font-serif text-[15px] sm:text-base font-bold text-[#0f2a4a] group-hover:text-[#1f66a8] transition-colors leading-tight line-clamp-1">
              {tr(product.name)}
            </h3>
          </Link>
        </div>

        {/* Finishes Pills & Bottom Actions */}
        <div className="pt-2.5 mt-2.5 border-t border-[#edf3f9] space-y-2.5">
          {product.finishes && (
            <div className="flex flex-wrap gap-1">
              {product.finishes.slice(0, 3).map((f, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-[#f7f9fc] hover:bg-[#edf3f9] border border-[#dbe4ee]/70 hover:border-[#15b498]/40 text-[9.5px] text-[#17375e] font-medium transition-colors"
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-1 relative z-30">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDetailsOpen(true);
              }}
              className="text-[11px] font-bold text-[#0f2a4a] hover:text-[#1f66a8] transition-colors inline-flex items-center gap-1 group/link cursor-pointer py-1"
            >
              <span>{tr('View Details')}</span>
              <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuoteRequest(product.name);
              }}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1f66a8] to-[#15b498] hover:from-[#15b498] hover:to-[#1f66a8] text-white text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{tr('Request Quote')}</span>
            </button>
          </div>
        </div>
      </div>

      {detailsOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} details`}
          onClick={() => setDetailsOpen(false)}
        >
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-[#dbe4ee] p-6 sm:p-8 relative" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-[#edf3f9] pb-5">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#1f66a8]">{tr(product.categoryName)}</span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#0f2a4a]">{tr(product.name)}</h3>
                <p className="mt-1 text-xs text-[#56667a]">MOQ: {product.moq} · {product.turnaround}</p>
              </div>
              <button type="button" onClick={() => setDetailsOpen(false)} aria-label="Close details" className="p-2 rounded-full text-[#56667a] hover:bg-[#edf3f9] cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#56667a]">{tr(product.description || product.shortDesc)}</p>

            {product.specs && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-[#f7f9fc] border border-[#edf3f9] p-3">
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-[#1f66a8]">{label}</div>
                    <div className="mt-1 text-sm text-[#0f2a4a]">{value}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-3 border-t border-[#edf3f9] pt-5">
              <button type="button" onClick={() => { setDetailsOpen(false); onQuoteRequest(product.name); }} className="inline-flex items-center gap-2 rounded-full bg-[#0f2a4a] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#1f66a8] cursor-pointer">
                <MessageSquare className="w-4 h-4" /> {tr('Get Quote')}
              </button>
              <Link to={`/products/${product.slug}`} onClick={() => setDetailsOpen(false)} className="inline-flex items-center gap-2 rounded-full border border-[#dbe4ee] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] hover:border-[#1f66a8] cursor-pointer">
                {tr('Full Product Page')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
