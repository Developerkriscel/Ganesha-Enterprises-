import React from 'react';
import { Link } from 'react-router-dom';
import { 
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
import { useLanguage } from '../context/LanguageContext';

export default function About({ onOpenQuote }) {
  const { tr } = useLanguage();
  return (
    <div>
      <PageHero
        badge="About Ganesha Enterprises"
        title="Quality Commercial Printing &"
        highlight="Corporate Branding."
        subtitle="Delivering reliable, high-precision digital printing and customized corporate merchandise since 2011 from Naraina Industrial Area, New Delhi."
        breadcrumbs={[{ name: 'About Us' }]}
      />

      {/* Narrative Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f2a4a] leading-tight tracking-tight">
                From a Precision Digital Press to a <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Complete Printing & Branding Hub.</span>
              </h2>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="h-[2px] w-12 bg-[#15b498] rounded-full"></span>
                <span className="h-px w-6 bg-[#dbe4ee] rounded-full"></span>
              </div>
              <p className="text-sm sm:text-base text-[#56667a] leading-relaxed">
                Founded with a clear mission: high-quality printing should be dependable, beautifully finished, and cost-effective. While on-screen designs can look great, poor quality printing ruins a brand's reputation. Ganesha Enterprises established a modern printing plant in the heart of New Delhi’s industrial district to solve this challenge.
              </p>
              <p className="text-sm sm:text-base text-[#56667a] leading-relaxed">
                Over the past 15 years, we have grown from high-resolution digital proofing into a complete commercial printing and corporate gifting facility. Today, airlines like Vistara and Air India, major public sector organizations like NTPC, and hospitality leaders rely on our plant for staff uniforms, executive gift kits, and event signage across India.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#0f2a4a]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1f66a8]" />
                  <span>ISO 9001:2015 Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1f66a8]" />
                  <span>FSC Sustainable Paper Sourcing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1f66a8]" />
                  <span>Doorstep Pan-India Logistics</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#0f2a4a] aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
                  alt="Crafting Luxury Stationery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#15b498] font-semibold">
                    {tr('The Naraina Facility')}
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
      <section className="py-16 bg-[#0f2a4a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {company.metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#15b498]">
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
      <section className="py-24 bg-[#f7f9fc] border-b border-[#dbe4ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
              Machinery & <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Production Infrastructure</span>
            </h2>
            <div className="flex items-center justify-center gap-2.5 pt-1">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#15b498]/60"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#15b498]"></span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#15b498]/60"></span>
            </div>
            <p className="text-sm text-[#56667a]">
              Inside our Naraina Industrial Area Phase 1 facility, advanced precision hardware meets master craftsman hand-finishing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-[#dbe4ee] space-y-4 shadow-subtle hover:shadow-premium transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#edf3f9] flex items-center justify-center text-[#1f66a8]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0f2a4a]">Japanese UV Flatbed & Direct Presses</h3>
              <p className="text-xs text-[#56667a] leading-relaxed">
                Prints sharp, vibrant colors directly onto metal, glass, stainless steel, acrylic, and heavy card paper with high color accuracy.
              </p>
              <ul className="text-xs space-y-2 text-[#0f2a4a] font-medium pt-2">
                <li>• Instant UV curing technology</li>
                <li>• Resolution up to 2400 DPI</li>
                <li>• Variable droplet micro-piezo heads</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#dbe4ee] space-y-4 shadow-subtle hover:shadow-premium transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#edf3f9] flex items-center justify-center text-[#1f66a8]">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0f2a4a]">Heidelberg Offset & Digital Web</h3>
              <p className="text-xs text-[#56667a] leading-relaxed">
                High-capacity sheet-fed multi-color lines calibrated with closed-loop densitometers to maintain color consistency across 100,000+ sheet runs.
              </p>
              <ul className="text-xs space-y-2 text-[#0f2a4a] font-medium pt-2">
                <li>• In-line coating & varnishing</li>
                <li>• Spectrophotometric ink regulation</li>
                <li>• Up to 600 GSM duplex board capacity</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#dbe4ee] space-y-4 shadow-subtle hover:shadow-premium transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#edf3f9] flex items-center justify-center text-[#1f66a8]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0f2a4a]">Premium Finishing & Custom Dies</h3>
              <p className="text-xs text-[#56667a] leading-relaxed">
                Our finishing unit is equipped with high-precision brass embossing dies, hydraulic hot-foil stamping machines, thermal lamination, and laser cutting tables.
              </p>
              <ul className="text-xs space-y-2 text-[#0f2a4a] font-medium pt-2">
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf3f9] text-[#1f66a8] text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            {tr('Visit Our Delhi Studio')}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f2a4a]">
            {tr('Experience the Paper Swatches in Person')}
          </h2>
          <p className="text-sm text-[#56667a] max-w-xl mx-auto">
            We welcome creative directors, brand managers, and procurement officers to inspect our live press sheets, debossing dies, and sample archives.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenQuote()}
              className="px-8 py-3.5 rounded-full bg-[#0f2a4a] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#15b498] transition-all shadow-md"
            >
              Request Sample Swatch Box
            </button>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-white border border-[#dbe4ee] text-[#0f2a4a] text-xs font-bold uppercase tracking-wider hover:border-[#1f66a8] transition-all"
            >
              View Plant Map & Hours
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

