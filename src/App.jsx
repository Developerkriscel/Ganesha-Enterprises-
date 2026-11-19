import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import SearchModal from './components/SearchModal';
import LightboxModal from './components/LightboxModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import WeddingPrinting from './pages/WeddingPrinting';
import ServiceDetails from './pages/ServiceDetails';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Portfolio from './pages/Portfolio';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

import { company } from './data/company';
import { MessageSquare } from 'lucide-react';
import { LanguageProvider } from './context/LanguageContext';

// Scroll to top on route navigation
function ScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialItem, setQuoteInitialItem] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);

  const handleOpenQuote = (itemName = '') => {
    setQuoteInitialItem(itemName);
    setQuoteModalOpen(true);
  };

  const handleOpenSearch = () => {
    setSearchModalOpen(true);
  };

  const handleOpenLightbox = (item) => {
    setLightboxItem(item);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#f7f9fc] text-[#0f2a4a] selection:bg-[#0f2a4a] selection:text-[#f7f9fc]">
      <ScrollRestoration />

      {/* Global Navigation */}
      <Navbar
        onOpenSearch={handleOpenSearch}
        onOpenQuote={handleOpenQuote}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={<Home onOpenQuote={handleOpenQuote} onOpenLightbox={handleOpenLightbox} />} 
          />
          <Route 
            path="/about" 
            element={<About onOpenQuote={handleOpenQuote} />} 
          />
          <Route 
            path="/services" 
            element={<Services onOpenQuote={handleOpenQuote} />} 
          />
          <Route 
            path="/services/:slug" 
            element={<ServiceDetails onOpenQuote={handleOpenQuote} />} 
          />
          <Route
            path="/wedding-printing"
            element={<WeddingPrinting onOpenQuote={handleOpenQuote} />}
          />
          <Route 
            path="/products" 
            element={<Products onOpenQuote={handleOpenQuote} />} 
          />
          <Route 
            path="/products/:slug" 
            element={<ProductDetails onOpenQuote={handleOpenQuote} />} 
          />
          <Route 
            path="/portfolio" 
            element={<Portfolio onOpenLightbox={handleOpenLightbox} onOpenQuote={handleOpenQuote} />} 
          />
          <Route 
            path="/blogs" 
            element={<Blogs />} 
          />
          <Route 
            path="/blogs/:slug" 
            element={<BlogDetails />} 
          />
          <Route 
            path="/contact" 
            element={<Contact />} 
          />
          <Route 
            path="/quote" 
            element={<Quote />} 
          />
          <Route 
            path="/privacy-policy" 
            element={<PrivacyPolicy />} 
          />
          <Route 
            path="/terms" 
            element={<Terms />} 
          />
          <Route 
            path="*" 
            element={<NotFound />} 
          />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer onOpenQuote={handleOpenQuote} />

      {/* Persistent Floating WhatsApp Helper Pill */}
      <a
        href={company.contact.whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 overflow-visible h-20 w-20 rounded-full bg-gradient-to-br from-[#25D366] to-[#18b957] text-white ring-4 ring-[#25D366]/20 shadow-[0_12px_30px_rgba(37,211,102,0.38)] hover:shadow-[0_16px_36px_rgba(37,211,102,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.08] active:translate-y-0 active:scale-95 flex items-center justify-center group"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 animate-ping" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-[#25D366]" />
        </span>
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#25D366] shadow-sm transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.53 0 .2 5.32.2 11.88c0 2.1.55 4.15 1.6 5.96L.1 24l6.3-1.65a11.87 11.87 0 0 0 5.68 1.45h.01c6.55 0 11.88-5.32 11.88-11.88 0-3.17-1.23-6.15-3.45-8.44ZM12.09 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.64-.23-.37a9.87 9.87 0 1 1 8.37 4.62Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35Z" />
          </svg>
        </span>
      </a>

      {/* Interactive Global Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={quoteInitialItem}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <LightboxModal
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onQuoteRequest={handleOpenQuote}
      />
      </div>
    </LanguageProvider>
  );
}

