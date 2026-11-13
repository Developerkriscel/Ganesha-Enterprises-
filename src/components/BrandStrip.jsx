import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { company } from '../data/company';

export default function BrandStrip({ title = "Trusted by Over 1,000+ Corporate, Aviation & Enterprise Leaders" }) {
  // Double the logos for seamless marquee loop
  const logos = [...company.clientLogos, ...company.clientLogos];

  return (
    <section className="py-14 border-y border-[#e4e2dd] bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f1ea] text-[#b8860b] text-xs font-semibold uppercase tracking-widest mb-3">
          <Award className="w-3.5 h-3.5" />
          Verified Corporate Partnerships
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#18191b] tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#686a71] mt-1 max-w-2xl mx-auto">
          Delivering precision color fidelity, branded uniforms, and high-stakes executive collateral for India’s most demanding enterprises.
        </p>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden mask-gradient-x">
        <div className="flex w-max items-center gap-12 sm:gap-16 animate-marquee hover:[animation-play-state:paused]">
          {logos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex flex-col items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 group cursor-default px-4"
            >
              <div className="h-14 sm:h-16 flex items-center justify-center p-2 rounded-xl bg-[#faf8f5] border border-[#eceae5] group-hover:border-[#b8860b] group-hover:shadow-md transition-all">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-10 sm:max-h-12 w-auto object-contain"
                  onError={(e) => {
                    // If image fails, render clean typographical badge
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML = `<span class="text-xs font-bold text-[#18191b] tracking-widest uppercase px-3">${client.name}</span>`;
                  }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#686a71] mt-2 font-medium group-hover:text-[#b8860b] transition-colors">
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
          animation: marquee 35s linear infinite;
        }
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}

