import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Package, Wrench, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 px-4 bg-[#f7f9fc]">
      <div className="max-w-xl text-center space-y-6">
        <div className="font-serif text-8xl sm:text-9xl font-extrabold text-[#0f2a4a]/10 select-none">
          404
        </div>
        <div className="space-y-2 -mt-12 relative z-10">
          <span className="text-xs uppercase tracking-widest text-[#1f66a8] font-semibold">
            Out of Register
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f2a4a]">
            Page Not Found on Our Press Sheet
          </h1>
          <p className="text-sm text-[#56667a] max-w-md mx-auto">
            The page or artifact you requested has been archived or moved. Explore our core divisions below.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-[#0f2a4a] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#15b498] transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>
          <Link
            to="/products"
            className="px-6 py-3 rounded-full bg-white border border-[#dbe4ee] text-[#0f2a4a] text-xs font-semibold uppercase tracking-wider hover:border-[#1f66a8] transition-all flex items-center gap-2"
          >
            <Package className="w-4 h-4 text-[#1f66a8]" />
            <span>Product Catalog</span>
          </Link>
          <Link
            to="/services"
            className="px-6 py-3 rounded-full bg-white border border-[#dbe4ee] text-[#0f2a4a] text-xs font-semibold uppercase tracking-wider hover:border-[#1f66a8] transition-all flex items-center gap-2"
          >
            <Wrench className="w-4 h-4 text-[#1f66a8]" />
            <span>Our Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

