import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';

export default function ProductCard({ product, onQuoteRequest, priority = false }) {
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-3xl border border-[#e4e2dd] hover:border-[#b8860b] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Light sweep shimmer effect */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
      </div>

      {/* Image Area with Badge */}
      <div className="relative aspect-[4/3] bg-[#f4f1ea] overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          onError={() => setImgSrc(product.backupImage)}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {product.badge && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#18191b]/90 backdrop-blur-md text-[#faf8f5] text-[10px] font-semibold uppercase tracking-widest border border-white/20 group-hover:bg-[#c59b27] transition-colors duration-300 shadow-md">
            {product.badge}
          </div>
        )}

        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#18191b] text-[10px] font-semibold tracking-wider border border-[#e4e2dd] shadow-sm">
          MOQ: {product.moq}
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 p-4">
          <Link
            to={`/products/${product.slug}`}
            className="px-4 py-2.5 rounded-full bg-white text-[#18191b] text-xs font-semibold uppercase tracking-wider hover:bg-[#b8860b] hover:text-white transition-all transform translate-y-3 group-hover:translate-y-0 duration-300 flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95"
          >
            <span>Specs & Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => onQuoteRequest(product.name)}
            className="px-4 py-2.5 rounded-full bg-[#18191b] text-[#faf8f5] text-xs font-semibold uppercase tracking-wider hover:bg-[#c59b27] transition-all transform translate-y-3 group-hover:translate-y-0 duration-300 delay-75 flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95"
          >
            <span>Inquire</span>
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-[#b8860b]">
              {product.categoryName}
            </span>
            <span className="text-[11px] text-[#686a71]">
              {product.turnaround}
            </span>
          </div>

          <Link to={`/products/${product.slug}`}>
            <h3 className="font-serif text-lg font-bold text-[#18191b] group-hover:text-[#b8860b] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#686a71] line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Finishes Pills & Bottom Actions */}
        <div className="pt-4 mt-4 border-t border-[#f4f1ea] space-y-3">
          {product.finishes && (
            <div className="flex flex-wrap gap-1.5">
              {product.finishes.slice(0, 3).map((f, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-[#faf8f5] border border-[#eceae5] text-[10px] text-[#686a71] font-medium hover:border-[#c59b27]/40 hover:text-[#18191b] transition-colors"
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <Link
              to={`/products/${product.slug}`}
              className="text-xs font-semibold text-[#18191b] hover:text-[#b8860b] transition-colors inline-flex items-center gap-1 group/link"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>

            <button
              onClick={() => onQuoteRequest(product.name)}
              className="text-xs font-semibold text-[#b8860b] hover:text-[#18191b] transition-colors uppercase tracking-wider inline-flex items-center gap-1 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3 h-3 text-[#c59b27]" />
              <span>Request Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

