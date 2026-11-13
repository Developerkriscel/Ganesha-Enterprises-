import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Sparkles, X, ArrowUpDown } from 'lucide-react';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { products, productCategories } from '../data/products';

export default function Products({ onOpenQuote }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSub = searchParams.get('sub') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSub, setActiveSub] = useState(initialSub);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const sub = searchParams.get('sub') || '';
    setActiveCategory(cat);
    setActiveSub(sub);
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setActiveSub('');
    setSearchParams(catId === 'all' ? {} : { category: catId });
  };

  const handleSubChange = (sub) => {
    setActiveSub(sub === activeSub ? '' : sub);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      // Subcategory filter
      if (activeSub && p.subcategory !== activeSub) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.categoryName.toLowerCase().includes(q);
        const matchesSub = p.subcategory.toLowerCase().includes(q);
        const matchesDesc = p.shortDesc.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesSub && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'turnaround') return a.turnaround.localeCompare(b.turnaround);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [activeCategory, activeSub, searchQuery, sortBy]);

  // Current category object
  const currentCatObj = productCategories.find(c => c.id === activeCategory);

  return (
    <div>
      <PageHero
        badge="Master Catalog"
        title="Bespoke Corporate &"
        highlight="Commercial Products"
        subtitle="Explore our curated collection of luxury stationery, customized apparel, onboarding hampers, and event displays."
        breadcrumbs={[{ name: 'Products' }]}
      />

      <section className="py-16 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Controls Bar: Category Tabs & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#dbe4ee]">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {productCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-[#0f2a4a] text-white shadow-md'
                      : 'bg-white border border-[#dbe4ee] text-[#56667a] hover:text-[#0f2a4a] hover:border-[#1f66a8]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-3">
              <div className="relative flex-grow sm:w-64">
                <Search className="w-4 h-4 text-[#56667a] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter products..."
                  className="w-full pl-10 pr-8 py-2 rounded-xl bg-white border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-[#56667a] hover:text-[#0f2a4a]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="name">Alphabetical (A-Z)</option>
                  <option value="turnaround">Turnaround Speed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subcategory Pills if applicable */}
          {currentCatObj?.subcategories && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-semibold text-[#0f2a4a] uppercase tracking-wider shrink-0 mr-1">
                Sub-Division:
              </span>
              {currentCatObj.subcategories.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSubChange(sub)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeSub === sub
                      ? 'bg-[#1f66a8] text-white'
                      : 'bg-white border border-[#e6edf5] text-[#56667a] hover:text-[#0f2a4a]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Result Count and Active Filters Bar */}
          <div className="flex items-center justify-between text-xs text-[#56667a]">
            <span>Showing <strong>{filteredProducts.length}</strong> verified corporate artifacts</span>
            {(activeCategory !== 'all' || activeSub || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActiveSub('');
                  setSearchQuery('');
                  setSearchParams({});
                }}
                className="text-[#1f66a8] font-semibold hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuoteRequest={onOpenQuote}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-4 bg-white rounded-3xl border border-[#dbe4ee]">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#edf3f9] flex items-center justify-center text-[#1f66a8]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0f2a4a]">No Products Matched Your Criteria</h3>
              <p className="text-xs text-[#56667a] max-w-md mx-auto">
                Try clearing search terms or selecting a different category. Our studio produces bespoke custom jobs beyond catalog listings.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActiveSub('');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 rounded-full bg-[#0f2a4a] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

