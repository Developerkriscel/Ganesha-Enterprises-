import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Calculator, 
  UploadCloud, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PageHero from '../components/PageHero';
import { services } from '../data/services';
import { productCategories } from '../data/products';
import { company } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

export default function Quote() {
  const { tr } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    category: 'Business Essentials',
    service: 'Corporate & Office Printing',
    quantity: '500',
    paperGSM: '350 GSM Art Board',
    finish: 'Velvet Matte + Gold Foil',
    deliveryDate: '',
    message: '',
    uploadedFileName: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Corporate Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid corporate or personal email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Mobile number is required.';
    } else {
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10 || !/^[6-9]\d{9}$/.test(cleanPhone.slice(-10))) {
        errs.phone = 'Please enter a valid 10-digit Indian mobile number.';
      }
    }
    if (!formData.message.trim()) {
      errs.message = 'Please specify dimensions, quantity, or branding details.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const quoteId = `GE-QUOTE-${Math.floor(100000 + Math.random() * 900000)}`;
      const submission = {
        id: quoteId,
        ...formData,
        timestamp: new Date().toISOString()
      };

      try {
        const stored = JSON.parse(localStorage.getItem('ge_quote_inquiries') || '[]');
        stored.unshift(submission);
        localStorage.setItem('ge_quote_inquiries', JSON.stringify(stored));
      } catch (err) {
        console.error('Storage error:', err);
      }

      setIsSubmitting(false);
      setSubmittedId(quoteId);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#15b498', '#0f2a4a', '#1f66a8']
      });
    }, 600);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Ganesha Enterprises,\nI am requesting a formal quote from your quote calculator:\n• Client: ${formData.fullName}\n• Company: ${formData.companyName || 'Corporate Client'}\n• Service: ${formData.service}\n• Substrate: ${formData.paperGSM} (${formData.finish})\n• Quantity: ${formData.quantity}\n• Notes: ${formData.message}`
    );
    window.open(`https://wa.me/919650044234?text=${text}`, '_blank');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, uploadedFileName: file.name }));
    }
  };

  return (
    <div>
      <PageHero
        badge="Get a Quote"
        title="Request a Detailed"
        highlight="Project Estimation"
        subtitle="Specify your paper choices, gold/silver foil finishes, t-shirt embroidery, or signage requirements to get a quick quote from our team."
        breadcrumbs={[{ name: 'Request a Quote' }]}
      />

      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="quote-page-card bg-white rounded-3xl p-4 sm:p-12 border border-[#dbe4ee] shadow-xl">
            {submittedId ? (
              <div className="text-center py-10 space-y-6">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#1f66a8]">
                    Proposal Reference #{submittedId}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#0f2a4a]">
                    Proposal Specifications Logged
                  </h3>
                  <p className="text-sm text-[#56667a] max-w-lg mx-auto">
                    Thank you, <strong>{formData.fullName}</strong>. Your custom print configuration has been stored locally. A dedicated account manager from our Naraina facility will prepare your customized SLA rate card.
                  </p>
                </div>

                <div className="p-6 bg-[#f7f9fc] rounded-2xl border border-[#dbe4ee] max-w-md mx-auto text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#56667a]">Client:</span>
                    <span className="font-semibold">{formData.fullName} {formData.companyName ? `(${formData.companyName})` : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#56667a]">Division:</span>
                    <span className="font-semibold">{formData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#56667a]">Paper & Finish:</span>
                    <span className="font-semibold">{formData.paperGSM} • {formData.finish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#56667a]">Batch Units:</span>
                    <span className="font-semibold">{formData.quantity} units</span>
                  </div>
                  {formData.uploadedFileName && (
                    <div className="flex justify-between">
                      <span className="text-[#56667a]">Attached Artwork:</span>
                      <span className="font-semibold">{formData.uploadedFileName}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <button
                    onClick={handleWhatsApp}
                    className="px-8 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{tr('Inquire via WhatsApp')}</span>
                  </button>
                  <button
                    onClick={() => setSubmittedId(null)}
                    className="px-8 py-3.5 rounded-full bg-[#0f2a4a] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#17375e] transition-all"
                  >
                    Configure Another Batch
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="quote-page-form space-y-8">
                
                {/* Step 1: Client Information */}
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f2a4a] border-b border-[#dbe4ee] pb-3 mb-4">
                    1. Stakeholder & Company Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rajesh Mehra"
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#f7f9fc] border text-xs text-[#0f2a4a] focus:outline-none ${
                          errors.fullName ? 'border-red-400' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                        }`}
                      />
                      {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Tata SIA / Radisson Hospitality"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#f7f9fc] border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Corporate Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#f7f9fc] border text-xs text-[#0f2a4a] focus:outline-none ${
                          errors.email ? 'border-red-400' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Mobile Number (India) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-xs font-semibold text-[#56667a]">+91</span>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="96500 44234"
                          className={`w-full pl-12 pr-4 py-2.5 rounded-xl bg-[#f7f9fc] border text-xs text-[#0f2a4a] focus:outline-none ${
                            errors.phone ? 'border-red-400' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Step 2: Production Specifications */}
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f2a4a] border-b border-[#dbe4ee] pb-3 mb-4">
                    2. Production Configuration & Quantities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Primary Division
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#f7f9fc] border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                      >
                        {services.map(s => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Preferred Paper / Material
                      </label>
                      <select
                        value={formData.paperGSM}
                        onChange={(e) => setFormData({ ...formData, paperGSM: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#f7f9fc] border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                      >
                        <option value="450 GSM French Cotton Pulp Board">450 GSM French Cotton Pulp Board</option>
                        <option value="350 GSM Velvet Matte Cardstock">350 GSM Velvet Matte Cardstock</option>
                        <option value="300 GSM Natural Linen Textured">300 GSM Natural Linen Textured</option>
                        <option value="E-Flute Corrugated Rigid Kraft">E-Flute Corrugated Rigid Kraft</option>
                        <option value="240 GSM Combed Pique Cotton (Apparel)">240 GSM Combed Pique Cotton (Apparel)</option>
                        <option value="Non-Curl Tear-Proof PET Film (Signage)">Non-Curl Tear-Proof PET Film (Signage)</option>
                        <option value="SUS 304 Food-Grade Steel (Drinkware)">SUS 304 Food-Grade Steel (Drinkware)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Special Finish
                      </label>
                      <select
                        value={formData.finish}
                        onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#f7f9fc] border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                      >
                        <option value="Velvet Matte + Gold Foil Stamping">Velvet Matte + Gold Foil Stamping</option>
                        <option value="Raised Spot UV Gloss Highlights">Raised Spot UV Gloss Highlights</option>
                        <option value="Multi-Level Sculptured 3D Emboss">Multi-Level Sculptured 3D Emboss</option>
                        <option value="Gold Gilded Metallic Edges">Gold Gilded Metallic Edges</option>
                        <option value="German High-Density Thread Embroidery">German High-Density Thread Embroidery</option>
                        <option value="360-Degree Rotary Laser Engraving">360-Degree Rotary Laser Engraving</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Estimated Batch Quantity
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="e.g. 250, 500, 2500, 10000"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#f7f9fc] border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Target Dispatch Date
                      </label>
                      <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#f7f9fc] border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Project Notes & Optional Artwork Attachment */}
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0f2a4a] border-b border-[#dbe4ee] pb-3 mb-4">
                    3. Project Notes & Artwork Attachment (Demo)
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Detailed Project Requirements & Instructions <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please mention exact sizes (e.g., 89x54mm, A4), Pantone ink codes, orientation, packaging requirements, or delivery location..."
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#f7f9fc] border text-xs text-[#0f2a4a] focus:outline-none ${
                          errors.message ? 'border-red-400' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                        }`}
                      />
                      {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                    </div>

                    {/* File Upload Box (Demo Mock) */}
                    <div className="p-5 border-2 border-dashed border-[#dbe4ee] rounded-2xl bg-[#f7f9fc] text-center space-y-2 hover:border-[#1f66a8] transition-colors relative">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <UploadCloud className="w-8 h-8 text-[#1f66a8] mx-auto" />
                      <p className="text-xs font-semibold text-[#0f2a4a]">
                        {formData.uploadedFileName ? `Attached: ${formData.uploadedFileName}` : 'Click or drag artwork files here (PDF, AI, EPS, PSD, ZIP)'}
                      </p>
                      <p className="text-[11px] text-[#56667a]">Up to 50MB. Vector curves with 3mm bleed recommended.</p>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-[#dbe4ee] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#56667a]">
                    <ShieldCheck className="w-4 h-4 text-[#1f66a8]" />
                    <span>Non-disclosure & Pantone accuracy guarantee included.</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex-1 sm:flex-none px-5 py-3.5 rounded-xl bg-white border border-[#25D366] text-[#128C7E] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#25D366]/10 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp RFQ</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-[#0f2a4a] hover:bg-[#15b498] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <span>Calculating...</span> : <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{tr('Submit Project RFQ')}</span>
                      </>}
                    </button>
                  </div>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

