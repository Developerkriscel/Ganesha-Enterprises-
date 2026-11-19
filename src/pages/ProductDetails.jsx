import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Package, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare,
  ArrowLeft,
  Share2,
  Layers
} from 'lucide-react';
import PageHero from '../components/PageHero';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetails({ onOpenQuote }) {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  const [mainImage, setMainImage] = useState(product ? product.image : '');
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="py-32 text-center max-w-lg mx-auto px-4 space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#0f2a4a]">Product Not Found</h2>
        <p className="text-sm text-[#56667a]">This item may have been archived or re-categorized in our catalog.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0f2a4a] text-white text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <PageHero
        badge={product.categoryName}
        title={product.name}
        subtitle={product.shortDesc}
        breadcrumbs={[
          { name: 'Products', path: '/products' },
          { name: product.categoryName, path: `/products?category=${product.category}` },
          { name: product.name }
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Product Gallery */}
            <div className="lg:col-span-6 space-y-4 sticky top-28">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#edf3f9] border border-[#dbe4ee] shadow-lg">
                <img
                  src={mainImage || product.image}
                  alt={product.name}
                  onError={(e) => { e.currentTarget.src = product.backupImage; }}
                  className="w-full h-full object-cover object-center"
                />

                {product.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0f2a4a] text-[#f7f9fc] text-[10px] font-semibold uppercase tracking-widest">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                <button
                  onClick={() => setMainImage(product.image)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    mainImage === product.image ? 'border-[#1f66a8]' : 'border-transparent opacity-70'
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => { e.currentTarget.src = product.backupImage; }}
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  onClick={() => setMainImage(product.backupImage)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    mainImage === product.backupImage ? 'border-[#1f66a8]' : 'border-transparent opacity-70'
                  }`}
                >
                  <img
                    src={product.backupImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            {/* Right Product Specifications & Inquiry Actions */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#1f66a8]">
                    {product.subcategory}
                  </span>
                  <button
                    onClick={handleShare}
                    className="text-xs text-[#56667a] hover:text-[#0f2a4a] inline-flex items-center gap-1 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copied ? 'Link Copied!' : 'Share Product'}</span>
                  </button>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f2a4a]">
                  {product.name}
                </h1>

                <p className="text-sm text-[#56667a] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quick Spec Highlights */}
              <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-[#f7f9fc] border border-[#dbe4ee]">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#56667a] block">Minimum Order Batch</span>
                  <span className="font-serif text-lg font-bold text-[#0f2a4a]">{product.moq}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#56667a] block">Production SLA</span>
                  <span className="font-serif text-lg font-bold text-[#0f2a4a]">{product.turnaround}</span>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-[#0f2a4a]">
                  Technical Specifications
                </h4>
                <div className="border border-[#dbe4ee] rounded-2xl overflow-hidden divide-y divide-[#e6edf5] text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex px-4 py-3 justify-between">
                      <span className="font-semibold text-[#56667a]">{key}</span>
                      <span className="text-[#0f2a4a] text-right font-medium max-w-[60%]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Finishes Available */}
              {product.finishes && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-[#0f2a4a]">
                    Available Premium Finishes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.finishes.map((f, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-white border border-[#dbe4ee] text-xs font-medium text-[#0f2a4a]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#dbe4ee] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenQuote(product.name)}
                  className="flex-1 py-4 rounded-full bg-[#0f2a4a] hover:bg-[#15b498] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <span>Request Custom Quote</span>
                </button>

                <a
                  href={`https://wa.me/919650044234?text=Hello%20Ganesha%20Enterprises%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Query</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-20 bg-[#f7f9fc] border-t border-[#dbe4ee]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-serif text-2xl font-bold text-[#0f2a4a]">
                Complementary Corporate Artifacts
              </h3>
              <Link to="/products" className="text-xs font-semibold text-[#1f66a8] hover:text-[#0f2a4a]">
                Explore All Products →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} onQuoteRequest={onOpenQuote} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

