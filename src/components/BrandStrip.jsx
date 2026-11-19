import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';

export default function BrandStrip({ title = "Trusted by Over 1,000+ Corporate, Aviation & Enterprise Leaders", badge = "Enterprise Portfolio" }) {
  const { tr } = useLanguage();
  // Double the logos for seamless marquee loop
  const logos = [...company.clientLogos, ...company.clientLogos];
  const translatedTitle = tr(title);

  return (
    <section className="py-12 sm:py-16 border-y border-[#dbe4ee] bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 lg:mb-14 text-center">
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#0f2a4a] leading-tight max-w-full mx-auto md:whitespace-nowrap">
          {translatedTitle.includes('1,000+') ? (
            <>
              Trusted by Over <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">1,000+ Corporate, Aviation</span> & Enterprise Leaders
            </>
          ) : (
            <span className="heading-gradient-dark">{translatedTitle}</span>
          )}
        </h3>

        <div className="mt-4 flex items-center justify-center gap-2.5">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#15b498]/60"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#15b498]"></span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#15b498]/60"></span>
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden mask-gradient-x py-2">
        <div className="flex w-max items-center gap-14 sm:gap-18 animate-marquee hover:[animation-play-state:paused] py-2">
          {logos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer px-3 relative hover:z-20"
            >
              <div className="h-12 sm:h-14 px-3 sm:px-4 flex items-center justify-center rounded-xl bg-[#f7f9fc] border border-[#e6edf5] group-hover:bg-white group-hover:border-[#15b498] group-hover:shadow-[0_14px_28px_-6px_rgba(21,180,152,0.32),0_6px_12px_-4px_rgba(31,102,168,0.18)] group-hover:scale-115 sm:group-hover:scale-120 group-hover:-translate-y-1.5 transition-all duration-300 ease-out">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-8 sm:max-h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // If image fails, render clean typographical badge
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML = `<span class="text-xs font-bold text-[#0f2a4a] tracking-widest uppercase px-3">${client.name}</span>`;
                  }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#56667a] mt-2 font-medium group-hover:text-[#0f2a4a] group-hover:font-bold group-hover:scale-105 transition-all duration-200">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}

