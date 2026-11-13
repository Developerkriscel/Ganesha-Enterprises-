import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';

export default function ProductCard({ product, onQuoteRequest, priority = false }) {
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <div className="group flex flex-col justify-between bg-white rounded-3xl border border-[#e4e2dd] hover:border-[#b8860b] overflow-hidden transition-all duration-300 hover:shadow-premium hover:-translate-y-1">
      {/* Image Area with Badge */}
      <div className="relative aspect-[4/3] bg-[#f4f1ea] overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          onError={() => setImgSrc(product.backupImage)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {product.badge && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#18191b]/90 backdrop-blur-md text-[#faf8f5] text-[10px] font-semibold uppercase tracking-widest border border-white/20">
            {product.badge}
          </div>
        )}

        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#18191b] text-[10px] font-semibold tracking-wider border border-[#e4e2dd]">
          MOQ: {product.moq}
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <Link
            to={`/products/${product.slug}`}
            className="px-4 py-2.5 rounded-full bg-white text-[#18191b] text-xs font-semibold uppercase tracking-wider hover:bg-[#b8860b] hover:text-white transition-colors flex items-center gap-1.5 shadow-lg"
          >
            <span>Specs & Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => onQuoteRequest(product.name)}
            className="px-4 py-2.5 rounded-full bg-[#18191b] text-[#faf8f5] text-xs font-semibold uppercase tracking-wider hover:bg-[#c59b27] transition-colors flex items-center gap-1.5 shadow-lg"
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
                  className="px-2 py-0.5 rounded-md bg-[#faf8f5] border border-[#eceae5] text-[10px] text-[#686a71] font-medium"
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <Link
              to={`/products/${product.slug}`}
              className="text-xs font-semibold text-[#18191b] hover:text-[#b8860b] transition-colors inline-flex items-center gap-1"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => onQuoteRequest(product.name)}
              className="text-xs font-semibold text-[#b8860b] hover:text-[#18191b] transition-colors uppercase tracking-wider"
            >
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

