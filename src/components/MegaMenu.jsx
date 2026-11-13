import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { productCategories, products } from '../data/products';

export default function MegaMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  const featured = products.filter(p => p.featured).slice(0, 2);

  return (
    <div 
      className="absolute top-full left-0 w-full bg-[#faf8f5] border-b border-[#e4e2dd] shadow-2xl py-8 px-6 lg:px-12 z-40 transition-all duration-300 animate-fadeIn"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Category Columns */}
          {productCategories.filter(c => c.id !== 'all').map((cat) => (
            <div key={cat.id} className="space-y-3">
              <Link
                to={`/products?category=${cat.id}`}
                onClick={onClose}
                className="font-serif text-sm font-bold text-[#18191b] hover:text-[#b8860b] transition-colors block border-b border-[#e4e2dd] pb-2"
              >
                {cat.name}
              </Link>
              <ul className="space-y-2 text-xs text-[#686a71]">
                {cat.subcategories?.map((sub, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/products?category=${cat.id}&sub=${encodeURIComponent(sub)}`}
                      onClick={onClose}
                      className="hover:text-[#18191b] hover:translate-x-1 inline-block transition-all"
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Featured Showcase Column */}
          <div className="hidden lg:flex flex-col justify-between bg-white p-5 rounded-2xl border border-[#e4e2dd]">
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-[#b8860b] mb-2">
                <Sparkles className="w-3 h-3" />
                Featured Artifact
              </div>
              <h4 className="font-serif text-sm font-bold text-[#18191b]">
                {featured[0]?.name}
              </h4>
              <p className="text-xs text-[#686a71] mt-1 line-clamp-2">
                {featured[0]?.shortDesc}
              </p>
              <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-[#f4f1ea]">
                <img
                  src={featured[0]?.image}
                  alt={featured[0]?.name}
                  onError={(e) => { e.currentTarget.src = featured[0]?.backupImage; }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <Link
              to={`/products/${featured[0]?.slug}`}
              onClick={onClose}
              className="mt-4 text-xs font-semibold text-[#18191b] hover:text-[#b8860b] inline-flex items-center gap-1 transition-colors"
            >
              <span>Explore Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Mega Menu Footer Banner */}
        <div className="mt-8 pt-6 border-t border-[#e4e2dd] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#686a71]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-[#18191b]">
              <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
              Pantone Precision Inks
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[#18191b]">
              <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
              FSC Certified Substrates
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[#18191b]">
              <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
              24-Hour Express Dispatch
            </span>
          </div>

          <Link
            to="/products"
            onClick={onClose}
            className="font-semibold text-[#18191b] hover:text-[#b8860b] inline-flex items-center gap-1.5"
          >
            <span>View Complete Product Catalog (90+ Items)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

