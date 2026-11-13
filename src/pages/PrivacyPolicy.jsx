import React from 'react';
import PageHero from '../components/PageHero';
import { company } from '../data/company';

export default function PrivacyPolicy() {
  return (
    <div>
      <PageHero
        badge="Governance"
        title="Privacy & Data"
        highlight="Protection Notice"
        subtitle="How Ganesha Enterprises safeguards corporate design assets, pre-press artwork, and institutional communications."
        breadcrumbs={[{ name: 'Privacy Policy' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-[#27282b] leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#18191b]">1. Asset Confidentiality & Non-Disclosure</h3>
            <p>
              At Ganesha Enterprises, we routinely handle proprietary brand assets, unpublished marketing collateral, confidential employee rosters for welcome kits, and intellectual property. All artwork files (vector AI, EPS, PDF, PSD) submitted to our Naraina facility are stored on encrypted production servers and accessed solely by authorized pre-press technicians.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#18191b]">2. Information We Collect</h3>
            <p>
              When requesting quotes, sample swatch books, or order dispatches, we collect your authorized point-of-contact details, including name, corporate email address, telephone numbers, delivery dispatch address, and GSTIN invoicing credentials.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#18191b]">3. Physical Waste & Plate Destruction</h3>
            <p>
              In accordance with enterprise confidentiality standards, all proofing misprints, cut off-trims bearing sensitive logos, and aluminum offset plates are systematically shredded or de-imaged before recycling. We do not resell or repurpose over-run printed merchandise without explicit written authorization.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#18191b]">4. Data Retention & Plant Access</h3>
            <p>
              Production files are retained for a standard period of 24 months to facilitate seamless repeat re-orders and color matching consistency. Clients may request immediate purging of all digital pre-press archives following job completion.
            </p>
          </div>

          <div className="pt-6 border-t border-[#e4e2dd] text-xs text-[#686a71]">
            <p>Ganesha Enterprises • Compliance Officer: Vineet Sharma • Email: vineet@ganeshaenterprises.in</p>
            <p>Ground Floor, B191, Industrial Area Phase I, Block C, Naraina Industrial Area Phase 1, New Delhi - 110028</p>
          </div>
        </div>
      </section>
    </div>
  );
}

