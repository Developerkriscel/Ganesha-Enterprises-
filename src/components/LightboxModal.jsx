import React, { useEffect } from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

export default function LightboxModal({ item, onClose, onQuoteRequest }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-[#0f2a4a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Container */}
        <div className="md:w-3/5 bg-black flex items-center justify-center p-6 relative">
          <img
            src={item.image}
            alt={item.title || item.name}
            onError={(e) => { e.currentTarget.src = item.backupImage; }}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
          />
        </div>

        {/* Details Container */}
        <div className="md:w-2/5 p-8 flex flex-col justify-between text-[#f7f9fc] bg-[#0f2a4a] overflow-y-auto">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#15b498] font-semibold">
              {item.category || item.categoryName} {item.year ? `• ${item.year}` : ''}
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              {item.title || item.name}
            </h3>
            {item.client && (
              <p className="text-xs text-[#1f66a8] font-medium tracking-wide">
                Client / Partner: <span className="text-white">{item.client}</span>
              </p>
            )}
            <p className="text-sm text-white/70 leading-relaxed">
              {item.scope || item.description || item.shortDesc}
            </p>

            {item.deliverables && (
              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-white/90">Scope & Craft:</h5>
                <ul className="text-xs space-y-1.5 text-white/60">
                  {item.deliverables.map((d, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1f66a8]"></span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.results && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                <strong className="text-[#15b498]">Execution Standard:</strong> {item.results}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                onClose();
                onQuoteRequest(item.title || item.name);
              }}
              className="w-full py-3 rounded-full bg-[#1f66a8] hover:bg-[#1f66a8] text-black font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              Request Quote for Similar Work
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-white/50">
              <ShieldCheck className="w-4 h-4 text-[#15b498]" />
              Produced at Ganesha Enterprises Naraina Studio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

