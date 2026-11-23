import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, X, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ServiceCard({ service, onQuoteRequest }) {
  const [imgSrc, setImgSrc] = useState(service.image);
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
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#dbe4ee] hover:border-[#15b498] flex flex-col justify-between transition-all duration-350 ease-out shadow-[0_4px_20px_rgba(15,42,74,0.05)] hover:shadow-[0_24px_50px_-10px_rgba(15,42,74,0.22),0_10px_20px_-5px_rgba(21,180,152,0.2)] sm:hover:scale-[1.045] sm:hover:-translate-y-2 z-10 hover:z-30 overflow-hidden will-change-transform">
      {/* Top subtle ambient glowing line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#15b498]/0 to-transparent group-hover:via-[#15b498] transition-all duration-500 z-30"></div>

      {/* Light sweep shimmer effect */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
      </div>

      {/* Visual Header - Compact Proportion */}
      <div className="relative aspect-[16/8.5] bg-[#0f2a4a] overflow-hidden">
        <img
          src={imgSrc}
          alt={service.title}
          loading="lazy"
          onError={() => setImgSrc(service.referenceImg)}
          className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0f2a4a] group-hover:bg-[#15b498] group-hover:text-white text-[9.5px] font-bold uppercase tracking-widest shadow-xs transition-colors duration-300">
          {tr(service.category)}
        </div>

        <div className="absolute bottom-3.5 left-4 right-4 z-10 text-white">
          <h3 className="font-serif text-base sm:text-lg font-bold leading-tight drop-shadow-sm group-hover:text-white transition-colors">
            {tr(service.title)}
          </h3>
        </div>
      </div>

      {/* Content - Compact Sizing */}
      <div className="p-4 sm:p-4.5 flex flex-col flex-grow justify-between space-y-2 bg-gradient-to-b from-white to-[#fafcff]">
        <div>
          <p className="text-[11px] text-[#56667a] leading-snug line-clamp-1">
            {tr(service.description)}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-2.5 border-t border-[#edf3f9] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setDetailsOpen(true)}
            className="text-[11px] font-bold text-[#0f2a4a] group-hover:text-[#1f66a8] inline-flex items-center gap-1 transition-colors group/link cursor-pointer py-1"
          >
            <span>{tr('View Details')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform text-[#15b498]" />
          </button>

          <button
            type="button"
            onClick={() => onQuoteRequest(service.title)}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-[#1f66a8] to-[#15b498] hover:from-[#15b498] hover:to-[#1f66a8] text-white text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 inline-flex items-center gap-1 cursor-pointer"
          >
            <MessageSquare className="w-3 h-3" />
            <span>{tr('Get Quote')}</span>
          </button>
        </div>
      </div>

      {detailsOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${service.title} details`}
          onClick={() => setDetailsOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-[#dbe4ee] p-6 sm:p-8 relative"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#edf3f9] pb-5">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#1f66a8]">{tr(service.category)}</span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#0f2a4a]">{tr(service.title)}</h3>
                <p className="mt-1 text-xs text-[#56667a]">Turnaround: {service.turnaround}</p>
              </div>
              <button type="button" onClick={() => setDetailsOpen(false)} aria-label="Close details" className="p-2 rounded-full text-[#56667a] hover:bg-[#edf3f9] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#56667a]">{tr(service.description)}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0f2a4a]">{tr('Core Deliverables')}</h4>
                <ul className="mt-3 space-y-2">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#56667a]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#1f66a8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0f2a4a]">{tr('Capabilities')}</h4>
                <ul className="mt-3 space-y-2">
                  {service.capabilities?.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#56667a]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#15b498]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-[#edf3f9] pt-5">
              <button
                type="button"
                onClick={() => { setDetailsOpen(false); onQuoteRequest(service.title); }}
                className="inline-flex items-center gap-2 rounded-full bg-[#0f2a4a] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#1f66a8] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                {tr('Get Quote')}
              </button>
              <Link to={`/services/${service.slug}`} onClick={() => setDetailsOpen(false)} className="inline-flex items-center gap-2 rounded-full border border-[#dbe4ee] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] hover:border-[#1f66a8] cursor-pointer">
                {tr('Full Service Page')}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

