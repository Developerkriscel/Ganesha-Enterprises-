import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Package, Wrench, Image, BookOpen } from 'lucide-react';
import { products } from '../data/products';
import { services } from '../data/services';
import { portfolioItems } from '../data/portfolio';
import { blogs } from '../data/blogs';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedProducts = q ? products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.categoryName.toLowerCase().includes(q) || 
    p.shortDesc.toLowerCase().includes(q)
  ).slice(0, 4) : [];

  const matchedServices = q ? services.filter(s => 
    s.title.toLowerCase().includes(q) || 
    s.description.toLowerCase().includes(q) || 
    s.category.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchedPortfolio = q ? portfolioItems.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.client.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchedBlogs = q ? blogs.filter(b => 
    b.title.toLowerCase().includes(q) || 
    b.excerpt.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const hasResults = matchedProducts.length > 0 || matchedServices.length > 0 || matchedPortfolio.length > 0 || matchedBlogs.length > 0;

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md transition-opacity animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#faf8f5] rounded-2xl shadow-2xl border border-[#e4e2dd] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#e4e2dd] bg-white">
          <Search className="w-5 h-5 text-[#b8860b]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, services, portfolio, journals..."
            className="w-full bg-transparent text-lg text-[#18191b] placeholder-[#686a71]/60 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-[#686a71] hover:text-[#18191b] rounded-full hover:bg-[#f4f1ea]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="ml-2 text-xs font-semibold px-2.5 py-1 bg-[#f4f1ea] text-[#686a71] rounded-md border border-[#e4e2dd] hover:bg-[#18191b] hover:text-[#faf8f5] transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-6 space-y-6">
          {!query && (
            <div className="text-center py-10 space-y-3">
              <p className="text-sm font-medium text-[#686a71] tracking-wide uppercase">Quick Suggestions</p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
                {['Visiting Cards', 'Employee Welcome Kit', 'Polo T-Shirts', 'Acrylic Calendars', 'Luxury Packaging', 'Vistara Uniforms'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#e4e2dd] text-[#18191b] hover:border-[#b8860b] hover:bg-[#faf8f5] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="text-center py-12">
              <p className="text-[#18191b] font-medium text-lg">No results found for "{query}"</p>
              <p className="text-sm text-[#686a71] mt-1">Try searching for "visiting cards", "welcome kit", "t-shirts", or "standees"</p>
            </div>
          )}

          {matchedProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[#b8860b]">
                <Package className="w-4 h-4" />
                <span>Products ({matchedProducts.length})</span>
              </div>
              <div className="space-y-2">
                {matchedProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(`/products/${p.slug}`)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#f4f1ea] border border-[#eceae5] hover:border-[#b8860b] cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={p.image} 
                        alt={p.name}
                        onError={(e) => { e.currentTarget.src = p.backupImage; }}
                        className="w-11 h-11 object-cover rounded-lg border border-[#eceae5]" 
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-[#18191b] group-hover:text-[#b8860b] transition-colors">{p.name}</h4>
                        <p className="text-xs text-[#686a71]">{p.categoryName} • MOQ: {p.moq}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#686a71] group-hover:text-[#b8860b] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedServices.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[#b8860b]">
                <Wrench className="w-4 h-4" />
                <span>Services ({matchedServices.length})</span>
              </div>
              <div className="space-y-2">
                {matchedServices.map(s => (
                  <div
                    key={s.id}
                    onClick={() => handleSelect(`/services/${s.slug}`)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#f4f1ea] border border-[#eceae5] hover:border-[#b8860b] cursor-pointer transition-all duration-200 group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-[#18191b] group-hover:text-[#b8860b] transition-colors">{s.title}</h4>
                      <p className="text-xs text-[#686a71]">{s.tagline}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#686a71] group-hover:text-[#b8860b] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedPortfolio.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[#b8860b]">
                <Image className="w-4 h-4" />
                <span>Portfolio Projects ({matchedPortfolio.length})</span>
              </div>
              <div className="space-y-2">
                {matchedPortfolio.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(`/portfolio#${item.id}`)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#f4f1ea] border border-[#eceae5] hover:border-[#b8860b] cursor-pointer transition-all duration-200 group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-[#18191b] group-hover:text-[#b8860b] transition-colors">{item.title}</h4>
                      <p className="text-xs text-[#686a71]">Client: {item.client} • {item.category}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#686a71] group-hover:text-[#b8860b] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedBlogs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[#b8860b]">
                <BookOpen className="w-4 h-4" />
                <span>Editorial Journals ({matchedBlogs.length})</span>
              </div>
              <div className="space-y-2">
                {matchedBlogs.map(b => (
                  <div
                    key={b.id}
                    onClick={() => handleSelect(`/blogs/${b.slug}`)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#f4f1ea] border border-[#eceae5] hover:border-[#b8860b] cursor-pointer transition-all duration-200 group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-[#18191b] group-hover:text-[#b8860b] transition-colors">{b.title}</h4>
                      <p className="text-xs text-[#686a71]">{b.category} • {b.readTime}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#686a71] group-hover:text-[#b8860b] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

