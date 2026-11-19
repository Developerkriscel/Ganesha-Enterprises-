import React from 'react';
import { ArrowRight, CheckCircle2, Heart, MessageSquare } from 'lucide-react';
import PageHero from '../components/PageHero';

const offerings = [
  { title: 'Invitations & RSVP Cards', description: 'Elegant wedding invitations, inserts, RSVP cards, and envelopes with coordinated finishes.' },
  { title: 'Ceremony & Reception Signage', description: 'Welcome boards, seating charts, menus, table numbers, and directional signage.' },
  { title: 'Wedding Favors & Keepsakes', description: 'Personalised tags, thank-you cards, gift boxes, and memorable guest keepsakes.' },
  { title: 'Albums & Day-of Stationery', description: 'Premium photo albums, programs, vow cards, and day-of stationery for a polished celebration.' },
];

export default function WeddingPrinting({ onOpenQuote }) {
  return (
    <div>
      <PageHero
        badge="Wedding Printing"
        title="Print Every Moment"
        highlight="Beautifully"
        subtitle="Thoughtful wedding stationery, signage, and keepsakes designed, printed, and finished as one cohesive celebration suite."
        breadcrumbs={[{ name: 'Wedding Printing' }]}
        image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop"
      >
        <button
          onClick={() => onOpenQuote('Wedding Printing')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1f66a8] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:-translate-y-0.5 transition-transform"
        >
          Start Your Suite <ArrowRight className="w-4 h-4" />
        </button>
      </PageHero>

      <section className="py-12 sm:py-16 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-2.5">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
                Everything Your Celebration <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Needs & Cherishes</span>
              </h2>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="h-[2px] w-10 bg-[#15b498] rounded-full"></span>
                <span className="h-px w-6 bg-[#dbe4ee] rounded-full"></span>
              </div>
            </div>
            <p className="text-sm text-[#56667a] max-w-md">One studio for the details guests touch, read, and remember.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offerings.map((item) => (
              <article key={item.title} className="rounded-2xl bg-white border border-[#dbe4ee] p-5 shadow-subtle hover:-translate-y-1 hover:shadow-premium transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#edf3f9] flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-[#1f66a8]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#0f2a4a] mb-2">{item.title}</h3>
                <p className="text-xs text-[#56667a] leading-relaxed line-clamp-3">{item.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#0f2a4a]"><CheckCircle2 className="w-4 h-4 text-[#15b498]" /> Made to order</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-[#0f2a4a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Let’s plan your wedding print suite</h2>
          <p className="mt-2 text-sm text-white/70">Share your date, quantity, and style. We’ll recommend the right papers, finishes, and timeline.</p>
          <button onClick={() => onOpenQuote('Wedding Printing')} className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15b498] text-[#0f2a4a] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors">
            <MessageSquare className="w-4 h-4" /> Request a quote
          </button>
        </div>
      </section>
    </div>
  );
}
