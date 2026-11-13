import React from 'react';
import PageHero from '../components/PageHero';
import { company } from '../data/company';

export default function Terms() {
  return (
    <div>
      <PageHero
        badge="Quality SLA"
        title="Terms of Production &"
        highlight="Technical Specifications"
        subtitle="Standard operating guidelines regarding color tolerance, pre-press proofing sign-offs, and freight logistics."
        breadcrumbs={[{ name: 'Terms & Conditions' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-[#27282b] leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#18191b]">1. Pre-Flight Approval & Soft Proofing</h3>
            <p>
              Production begins only upon formal digital or physical hard-proof sign-off by the client. It is the client’s sole responsibility to audit typography, contact numbers, orthography, barcode readability, and bleed lines before final sign-off. Once plates or UV matrices are set, modifications require plate replacement charges.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#18191b]">2. Chromatic Tolerances & Pantone® Standards</h3>
            <p>
              Due to variations in substrate absorption, natural wood grain, uncoated cotton pulp fibers, and thermal curing temperatures, a visual tolerance delta of ±5% is standard across commercial print runs. Where strict Pantone PMS calibration is mandated, clients should request physical wet proofs on target substrates.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#18191b]">3. Batch Count & Industry Margin</h3>
            <p>
              In industrial printing, binding, and finishing, a standard trade overrun or underrun margin of up to 3% is recognized. Ganesha Enterprises invoices only for the exact verified quantity delivered.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#18191b]">4. Dispatch, Freight & Inspection Period</h3>
            <p>
              All shipments dispatched from Naraina Industrial Area are inspected for packaging integrity. Consignees must inspect shipments upon arrival and note any transit carton damage on the carrier docket within 48 hours of delivery.
            </p>
          </div>

          <div className="pt-6 border-t border-[#e4e2dd] text-xs text-[#686a71]">
            <p>Ganesha Enterprises • Naraina Industrial Area Phase 1, New Delhi</p>
            <p>Hotline: +91 96500 44234 • vineet@ganeshaenterprises.in</p>
          </div>
        </div>
      </section>
    </div>
  );
}

