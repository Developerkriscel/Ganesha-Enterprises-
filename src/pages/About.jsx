import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Layers, 
  Printer, 
  Clock, 
  MapPin, 
  ArrowRight,
  Cpu,
  Target,
  Compass
} from 'lucide-react';
import PageHero from '../components/PageHero';
import BrandStrip from '../components/BrandStrip';
import { company } from '../data/company';

export default function About({ onOpenQuote }) {
  return (
    <div>
      <PageHero
        badge="Heritage & Craftsmanship"
        title="We Are Printers."
        highlight="We Are Brand Architects."
        subtitle="Bridging Swiss chromatic accuracy and Indian industrial manufacturing since 2011 from Naraina Industrial Area, New Delhi."
        breadcrumbs={[{ name: 'About Us' }]}
      />

      {/* Narrative Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold">
                Our Genesis & Evolution
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18191b] leading-tight">
                From a Specialized Digital Press to a Full-Spectrum Branding Studio.
              </h2>
              <p className="text-sm sm:text-base text-[#686a71] leading-relaxed">
                Founded with a singular conviction: that physical printing should never be an afterthought. In an era dominated by pixel-perfect digital designs that lost their soul when transferred to cheap paper, Ganesha Enterprises set out to establish a world-class production studio in the heart of New Delhi’s industrial district.
              </p>
              <p className="text-sm sm:text-base text-[#686a71] leading-relaxed">
                Over the past 15 years, we have evolved from high-resolution digital proofing into end-to-end tactile brand engineering. Today, airlines such as Vistara and Air India, public sector behemoths like NTPC, and luxury hospitality leaders rely on our plant for precision uniforms, executive gift suites, and nationwide event signage.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#18191b]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
                  <span>ISO 9001:2015 Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
                  <span>FSC Sustainable Paper Sourcing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
                  <span>Doorstep Pan-India Logistics</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#18191b] aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
                  alt="Crafting Luxury Stationery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#c59b27] font-semibold">
                    The Naraina Atelier
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1">
                    Precision Dies, Embossing & Japanese UV Presses
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Strip */}
      <section className="py-16 bg-[#18191b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {company.metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-serif text-4xl sm:text-5xl font-extrabold text-[#c59b27]">
                  {m.value}
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-white/90">
                  {m.label}
                </div>
                <div className="text-[11px] text-white/50">
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Machinery & Engineering Pillars */}
      <section className="py-24 bg-[#faf8f5] border-b border-[#e4e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold">
              Industrial Pedigree
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#18191b]">
              Machinery & Production Infrastructure
            </h2>
            <p className="text-sm text-[#686a71]">
              Inside our Naraina Industrial Area Phase 1 facility, advanced precision hardware meets master craftsman hand-finishing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-[#e4e2dd] space-y-4 shadow-subtle hover:shadow-premium transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#f4f1ea] flex items-center justify-center text-[#b8860b]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18191b]">Japanese UV Flatbed & Direct Presses</h3>
              <p className="text-xs text-[#686a71] leading-relaxed">
                Capable of curing photo-grade inks directly onto metal, glass, 304 steel, acrylic, and heavy cardstocks with zero chromatic aberration.
              </p>
              <ul className="text-xs space-y-2 text-[#18191b] font-medium pt-2">
                <li>• Instant UV curing technology</li>
                <li>• Resolution up to 2400 DPI</li>
                <li>• Variable droplet micro-piezo heads</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#e4e2dd] space-y-4 shadow-subtle hover:shadow-premium transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#f4f1ea] flex items-center justify-center text-[#b8860b]">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18191b]">Heidelberg Offset & Digital Web</h3>
              <p className="text-xs text-[#686a71] leading-relaxed">
                High-capacity sheet-fed multi-color lines calibrated with closed-loop densitometers to maintain color consistency across 100,000+ sheet runs.
              </p>
              <ul className="text-xs space-y-2 text-[#18191b] font-medium pt-2">
                <li>• In-line coating & varnishing</li>
                <li>• Spectrophotometric ink regulation</li>
                <li>• Up to 600 GSM duplex board capacity</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#e4e2dd] space-y-4 shadow-subtle hover:shadow-premium transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#f4f1ea] flex items-center justify-center text-[#b8860b]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18191b]">Artisanal Finishing & Brass Dies</h3>
              <p className="text-xs text-[#686a71] leading-relaxed">
                Our bespoke finishing station houses German-engraved brass embossing dies, hydraulic hot-foil presses, thermal lamination, and laser-guided cutting tables.
              </p>
              <ul className="text-xs space-y-2 text-[#18191b] font-medium pt-2">
                <li>• Multi-level 3D sculptured embossing</li>
                <li>• Micro-registered hot metallic foils</li>
                <li>• Precision CNC laser die-cutting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <BrandStrip title="Trusted by Renowned Indian & Global Institutions" />

      {/* Plant Location & CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f1ea] text-[#b8860b] text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Visit Our Delhi Studio
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#18191b]">
            Experience the Paper Swatches in Person
          </h2>
          <p className="text-sm text-[#686a71] max-w-xl mx-auto">
            We welcome creative directors, brand managers, and procurement officers to inspect our live press sheets, debossing dies, and sample archives.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenQuote()}
              className="px-8 py-3.5 rounded-full bg-[#18191b] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#c59b27] transition-all shadow-md"
            >
              Request Sample Swatch Box
            </button>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-white border border-[#e4e2dd] text-[#18191b] text-xs font-bold uppercase tracking-wider hover:border-[#b8860b] transition-all"
            >
              View Plant Map & Hours
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

