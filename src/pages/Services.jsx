import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Layers, 
  FileCheck,
  Truck,
  Palette
} from 'lucide-react';
import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

export default function Services({ onOpenQuote }) {
  const steps = [
    {
      num: "01",
      title: "Consultation & Substrate Curation",
      desc: "Our senior print architect assesses your brand guidelines, target audience, and selects optimal GSM weight, coatings, and structural die-lines."
    },
    {
      num: "02",
      title: "Pre-Press & Color Calibration",
      desc: "Files undergo rigorous 14-point pre-flight verification, bleed checks, and spectrophotometric Pantone® matching before physical press proofing."
    },
    {
      num: "03",
      title: "Precision Press Execution",
      desc: "Printed using advanced Japanese UV flatbed, digital web, or Heidelberg multi-head offset lines for laser-sharp typographic clarity."
    },
    {
      num: "04",
      title: "Artisanal Finishing & Quality Audit",
      desc: "Hydraulic foil stamping, 3D sculptured embossing, laser die-cutting, followed by individual hand-inspection of every single sheet."
    },
    {
      num: "05",
      title: "Insured Pan-India Dispatch",
      desc: "Palletized industrial moisture-sealed packing and doorstep express logistics across all metro business corridors."
    }
  ];

  return (
    <div>
      <PageHero
        badge="Industrial Mastery"
        title="Comprehensive Printing &"
        highlight="Brand Production Services"
        subtitle="Turnkey corporate stationery, luxury packaging, airline uniforms, large-format event branding, and precision laser craft."
        breadcrumbs={[{ name: 'Services' }]}
      />

      {/* Services Grid */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onQuoteRequest={onOpenQuote}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Production Workflow: The 5-Step Precision Protocol */}
      <section className="py-24 bg-white border-y border-[#e4e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold">
              The Protocol
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18191b]">
              From Vector Art to Flawless Physical Impression
            </h2>
            <p className="text-sm text-[#686a71]">
              Every client commission follows a rigid 5-stage production roadmap to ensure zero defect rates and punctual SLA dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((s, idx) => (
              <div 
                key={idx}
                className="relative p-6 rounded-2xl bg-[#faf8f5] border border-[#e4e2dd] hover:border-[#b8860b] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="font-serif text-3xl font-extrabold text-[#b8860b]/40 group-hover:text-[#b8860b] transition-colors mb-4">
                    {s.num}
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#18191b] mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#686a71] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Turnaround Banner */}
      <section className="py-16 bg-[#18191b] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c59b27]/20 text-[#c59b27] text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            24-Hour Emergency Production Protocol
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Do You Have an Urgent Event or Exhibition Deadline?
          </h2>
          <p className="text-sm text-white/70 max-w-2xl mx-auto">
            Our Naraina facility maintains dedicated rapid-response presses for urgent roll-up standees, exhibition collaterals, executive visiting cards, and summit name badges.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenQuote("Emergency 24-Hour Turnaround")}
              className="px-8 py-3.5 rounded-full bg-[#c59b27] hover:bg-[#b8860b] text-[#18191b] font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
            >
              Trigger Priority Run
            </button>
            <a
              href="tel:9650044234"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all"
            >
              Call Hotline (+91 96500 44234)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

