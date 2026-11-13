import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Package, Wrench, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 px-4 bg-[#faf8f5]">
      <div className="max-w-xl text-center space-y-6">
        <div className="font-serif text-8xl sm:text-9xl font-extrabold text-[#18191b]/10 select-none">
          404
        </div>
        <div className="space-y-2 -mt-12 relative z-10">
          <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold">
            Out of Register
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#18191b]">
            Page Not Found on Our Press Sheet
          </h1>
          <p className="text-sm text-[#686a71] max-w-md mx-auto">
            The page or artifact you requested has been archived or moved. Explore our core divisions below.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-[#18191b] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#c59b27] transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>
          <Link
            to="/products"
            className="px-6 py-3 rounded-full bg-white border border-[#e4e2dd] text-[#18191b] text-xs font-semibold uppercase tracking-wider hover:border-[#b8860b] transition-all flex items-center gap-2"
          >
            <Package className="w-4 h-4 text-[#b8860b]" />
            <span>Product Catalog</span>
          </Link>
          <Link
            to="/services"
            className="px-6 py-3 rounded-full bg-white border border-[#e4e2dd] text-[#18191b] text-xs font-semibold uppercase tracking-wider hover:border-[#b8860b] transition-all flex items-center gap-2"
          >
            <Wrench className="w-4 h-4 text-[#b8860b]" />
            <span>Our Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

