import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ServiceCard({ service, onQuoteRequest }) {
  const [imgSrc, setImgSrc] = useState(service.image);

  return (
    <div className="group relative bg-white rounded-3xl border border-[#dbe4ee] hover:border-[#1f66a8] overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Light sweep shimmer effect */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
      </div>

      {/* Visual Header */}
      <div className="relative aspect-[16/10] bg-[#0f2a4a] overflow-hidden">
        <img
          src={imgSrc}
          alt={service.title}
          loading="lazy"
          onError={() => setImgSrc(service.referenceImg)}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0f2a4a] text-[10px] font-semibold uppercase tracking-widest shadow-sm">
          {service.category}
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
          <span className="text-[10px] uppercase tracking-widest text-[#15b498] font-semibold block mb-0.5">
            Turnaround: {service.turnaround}
          </span>
          <h3 className="font-serif text-xl font-bold leading-tight drop-shadow-sm group-hover:text-[#edf3f9] transition-colors">
            {service.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <p className="text-xs text-[#56667a] leading-relaxed line-clamp-3">
            {service.description}
          </p>

          <div className="mt-4 space-y-2">
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#0f2a4a]">Core Deliverables:</h5>
            <div className="space-y-1.5">
              {service.deliverables.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#56667a]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1f66a8] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#edf3f9] flex items-center justify-between">
          <Link
            to={`/services/${service.slug}`}
            className="text-xs font-semibold text-[#0f2a4a] group-hover:text-[#1f66a8] inline-flex items-center gap-1 transition-colors group/link"
          >
            <span>Capabilities & Specs</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>

          <button
            onClick={() => onQuoteRequest(service.title)}
            className="text-xs font-semibold text-[#1f66a8] hover:text-[#0f2a4a] uppercase tracking-wider transition-colors inline-flex items-center gap-1 hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}

