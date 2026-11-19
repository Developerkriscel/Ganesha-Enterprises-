import React from 'react';
import { Link } from 'react-router-dom';
import { 
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
import { useLanguage } from '../context/LanguageContext';

export default function Services({ onOpenQuote }) {
  const { tr } = useLanguage();
  const steps = [
    {
      num: "01",
      title: "Consultation & Paper Selection",
      desc: "Our printing experts review your brand guidelines and help you choose the best paper GSM, textures, and box structures for your budget."
    },
    {
      num: "02",
      title: "Design Check & Color Matching",
      desc: "Your design files undergo thorough quality checks, bleed verification, and exact Pantone color matching before sample printing."
    },
    {
      num: "03",
      title: "High-Quality Printing Execution",
      desc: "Printed using advanced Japanese UV flatbed, digital web, or Heidelberg multi-color offset machines for sharp and clear output."
    },
    {
      num: "04",
      title: "Special Finishing & Quality Check",
      desc: "Gold/silver foil stamping, 3D embossing, and laser die-cutting, followed by individual quality inspection of every finished piece."
    },
    {
      num: "05",
      title: "Safe Pan-India Delivery",
      desc: "Moisture-proof safe packaging and reliable express courier delivery to your doorstep across India."
    }
  ];

  return (
    <div>
      <PageHero
        badge="Printing & Production"
        title="Comprehensive Printing &"
        highlight="Brand Production Services"
        subtitle="Complete corporate stationery, custom packaging, airline uniforms, large-format event branding, and precision laser printing."
        breadcrumbs={[{ name: 'Services' }]}
      />

      {/* Services Grid */}
      <section className="py-20 bg-[#f7f9fc]">
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
      <section className="py-24 bg-white border-y border-[#dbe4ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
              From Digital Design to <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Finished Printed Product</span>
            </h2>
            <div className="flex items-center justify-center gap-2.5 pt-1">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#15b498]/60"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#15b498]"></span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#15b498]/60"></span>
            </div>
            <p className="text-sm text-[#56667a]">
              Every client commission follows a rigid 5-stage production roadmap to ensure zero defect rates and punctual SLA dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((s, idx) => (
              <div 
                key={idx}
                className="relative p-6 rounded-2xl bg-[#f7f9fc] border border-[#dbe4ee] hover:border-[#1f66a8] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="font-serif text-3xl font-extrabold text-[#1f66a8]/40 group-hover:text-[#1f66a8] transition-colors mb-4">
                    {s.num}
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#0f2a4a] mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#56667a] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Turnaround Banner */}
      <section className="py-16 bg-[#0f2a4a] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15b498]/20 text-[#15b498] text-xs font-semibold uppercase tracking-wider">
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
              className="px-8 py-3.5 rounded-full bg-[#1f66a8] hover:bg-[#1f66a8] text-[#0f2a4a] font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
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

