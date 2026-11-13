import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import QuoteModal from './components/QuoteModal';
import SearchModal from './components/SearchModal';
import LightboxModal from './components/LightboxModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
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
        className="fixed bottom-6 left-6 z-40 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">WhatsApp Studio</span>
      </a>

      {/* Back to Top Floating Button */}
      <ScrollToTop />

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
  );
}

