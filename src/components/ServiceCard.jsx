import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ServiceCard({ service, onQuoteRequest }) {
  const [imgSrc, setImgSrc] = useState(service.image);

  return (
    <div className="group relative bg-white rounded-3xl border border-[#e4e2dd] hover:border-[#b8860b] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-premium hover:-translate-y-1">
      {/* Visual Header */}
      <div className="relative aspect-[16/10] bg-[#18191b] overflow-hidden">
        <img
          src={imgSrc}
          alt={service.title}
          loading="lazy"
          onError={() => setImgSrc(service.referenceImg)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#18191b] text-[10px] font-semibold uppercase tracking-widest">
          {service.category}
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
          <span className="text-[10px] uppercase tracking-widest text-[#c59b27] font-semibold block mb-0.5">
            Turnaround: {service.turnaround}
          </span>
          <h3 className="font-serif text-xl font-bold leading-tight drop-shadow-sm">
            {service.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <p className="text-xs text-[#686a71] leading-relaxed line-clamp-3">
            {service.description}
          </p>

          <div className="mt-4 space-y-2">
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#18191b]">Core Deliverables:</h5>
            <div className="space-y-1.5">
              {service.deliverables.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#686a71]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#b8860b] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#f4f1ea] flex items-center justify-between">
          <Link
            to={`/services/${service.slug}`}
            className="text-xs font-semibold text-[#18191b] group-hover:text-[#b8860b] inline-flex items-center gap-1 transition-colors"
          >
            <span>Capabilities & Specs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => onQuoteRequest(service.title)}
            className="text-xs font-semibold text-[#b8860b] hover:text-[#18191b] uppercase tracking-wider transition-colors inline-flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}

