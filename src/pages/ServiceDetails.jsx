import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Package, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare,
  ArrowLeft 
} from 'lucide-react';
import PageHero from '../components/PageHero';
import { services } from '../data/services';

export default function ServiceDetails({ onOpenQuote }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="py-32 text-center max-w-lg mx-auto px-4 space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#0f2a4a]">Service Specification Not Found</h2>
        <p className="text-sm text-[#56667a]">The requested printing service division could not be located in our production directory.</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0f2a4a] text-white text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Services</span>
        </Link>
      </div>
    );
  }

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div>
      <PageHero
        badge={service.category}
        title={service.title}
        subtitle={service.tagline}
        breadcrumbs={[
          { name: 'Services', path: '/services' },
          { name: service.shortTitle }
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Main Content Body */}
            <div className="lg:col-span-8 space-y-10">
              {/* Feature Image */}
              <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-[#0f2a4a] shadow-2xl relative">
                <img
                  src={service.image}
                  alt={service.title}
                  onError={(e) => { e.currentTarget.src = service.referenceImg; }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Technical Description */}
              <div className="space-y-4 text-sm sm:text-base text-[#56667a] leading-relaxed">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0f2a4a]">
                  Overview & Engineering Scope
                </h3>
                <p>{service.longDescription}</p>
              </div>

              {/* Scope Deliverables */}
              <div className="space-y-4 p-8 rounded-3xl bg-[#f7f9fc] border border-[#dbe4ee]">
                <h4 className="font-serif text-xl font-bold text-[#0f2a4a]">
                  Standard Corporate Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0f2a4a] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#1f66a8] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Craft & Technical Highlights */}
              <div className="space-y-4">
                <h4 className="font-serif text-xl font-bold text-[#0f2a4a]">
                  Technical Standards & Material Integrity
                </h4>
                <div className="space-y-2.5">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-[#e6edf5] text-xs sm:text-sm text-[#56667a] flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#1f66a8] shrink-0"></span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Sticky Specification Card */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="p-8 rounded-3xl bg-[#f7f9fc] border border-[#dbe4ee] shadow-lg space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#1f66a8] font-bold">
                    Division Specs
                  </span>
                  <h4 className="font-serif text-xl font-bold text-[#0f2a4a] mt-1">
                    {service.shortTitle}
                  </h4>
                </div>

                <div className="space-y-4 text-xs border-y border-[#dbe4ee] py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#56667a] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#1f66a8]" />
                      Estimated SLA:
                    </span>
                    <span className="font-bold text-[#0f2a4a] text-right">{service.turnaround}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#56667a] flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-[#1f66a8]" />
                      Minimum Batch:
                    </span>
                    <span className="font-bold text-[#0f2a4a]">{service.minQuantity}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#56667a] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#1f66a8]" />
                      Proofing:
                    </span>
                    <span className="font-bold text-[#0f2a4a]">Digital & Physical Swatch</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenQuote(service.title)}
                  className="w-full py-4 rounded-full bg-[#0f2a4a] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#15b498] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Custom Quote</span>
                </button>

                <a
                  href={`https://wa.me/919650044234?text=Hello%20Ganesha%20Enterprises%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-[#20ba5a] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Fast-Track on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-[#f7f9fc] border-t border-[#dbe4ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-serif text-2xl font-bold text-[#0f2a4a]">
              Complementary Printing Capabilities
            </h3>
            <Link to="/services" className="text-xs font-semibold text-[#1f66a8] hover:text-[#0f2a4a]">
              View All Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map(r => (
              <div key={r.id} className="p-6 rounded-2xl bg-white border border-[#dbe4ee] hover:border-[#1f66a8] transition-all group flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1f66a8]">{r.category}</span>
                  <h4 className="font-serif text-lg font-bold text-[#0f2a4a] group-hover:text-[#1f66a8] transition-colors mt-1">{r.title}</h4>
                  <p className="text-xs text-[#56667a] mt-2 line-clamp-2">{r.description}</p>
                </div>
                <Link to={`/services/${r.slug}`} className="mt-4 pt-4 border-t border-[#e6edf5] text-xs font-semibold text-[#0f2a4a] inline-flex items-center gap-1 group-hover:text-[#1f66a8]">
                  <span>Explore Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

