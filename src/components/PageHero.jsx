import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function PageHero({ 
  badge = "Ganesha Enterprises", 
  title, 
  subtitle, 
  breadcrumbs = [],
  highlight 
}) {
  return (
    <section className="relative pt-32 pb-16 sm:pb-20 bg-gradient-to-b from-[#f4f1ea] via-[#faf8f5] to-[#faf8f5] border-b border-[#e4e2dd] overflow-hidden">
      {/* Decorative Grid Texture */}
      <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Trail */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#686a71] mb-6">
            <Link to="/" className="hover:text-[#18191b] transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3 h-3 text-[#b8860b]" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-[#18191b] transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-[#18191b] font-medium">{crumb.name}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="max-w-3xl space-y-4">
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#b8860b] border border-[#e4e2dd] text-xs font-semibold uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              {badge}
            </div>
          )}

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#18191b] tracking-tight leading-[1.1]">
            {title} {highlight && <span className="gold-gradient-text block sm:inline">{highlight}</span>}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-[#686a71] leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

