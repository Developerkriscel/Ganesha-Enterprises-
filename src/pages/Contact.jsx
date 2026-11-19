import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PageHero from '../components/PageHero';
import { company } from '../data/company';
import { useLanguage } from '../context/LanguageContext';
import { services } from '../data/services';

export default function Contact() {
  const { tr } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: 'Business Essentials',
    service: 'Corporate & Office Printing',
    quantity: '500',
    deliveryDate: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid corporate or personal email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else {
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10 || !/^[6-9]\d{9}$/.test(cleanPhone.slice(-10))) {
        errs.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9650044234).';
      }
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide brief details on required specifications or quantities.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const quoteId = `GE-CNT-${Math.floor(100000 + Math.random() * 900000)}`;
      const submission = {
        id: quoteId,
        ...formData,
        timestamp: new Date().toISOString()
      };

      try {
        const stored = JSON.parse(localStorage.getItem('ge_contact_submissions') || '[]');
        stored.unshift(submission);
        localStorage.setItem('ge_contact_submissions', JSON.stringify(stored));
      } catch (err) {
        console.error('Local storage write error:', err);
      }

      setIsSubmitting(false);
      setSubmittedId(quoteId);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#15b498', '#0f2a4a', '#1f66a8']
      });
    }, 600);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Ganesha Enterprises,\nI am writing from your website contact page.\n• Name: ${formData.fullName || 'Client'}\n• Service: ${formData.service}\n• Phone: ${formData.phone || ''}\n• Requirements: ${formData.message || 'Custom printing quote inquiry'}`
    );
    window.open(`https://wa.me/919650044234?text=${text}`, '_blank');
  };

  return (
    <div>
      <PageHero
        badge="Contact Us"
        title="Get in Touch with"
        highlight="Our Printing Team"
        subtitle="Schedule a factory visit, request paper & product sample kits, or discuss bulk corporate orders with our team."
        breadcrumbs={[{ name: 'Contact' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Contact Card & Address */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
                  Ganesha <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Enterprises Head Office & Plant</span>
                </h2>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="h-[2px] w-12 bg-[#15b498] rounded-full"></span>
                  <span className="h-px w-6 bg-[#dbe4ee] rounded-full"></span>
                </div>
                <p className="text-sm text-[#56667a] leading-relaxed">
                  Situated in the premier industrial manufacturing zone of West Delhi with direct metro connectivity and high-capacity dispatch docks.
                </p>
              </div>

              {/* Verified Contact Details Cards */}
              <div className="space-y-4 text-xs">
                <div className="p-5 rounded-2xl bg-[#f7f9fc] border border-[#dbe4ee] space-y-2">
                  <div className="flex items-center gap-2 text-[#1f66a8] font-bold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                  <span>{tr('Physical Workshop & Studio')}</span>
                  </div>
                  <p className="text-[#0f2a4a] font-medium text-sm leading-relaxed">
                    {company.contact.address.full}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f9fc] border border-[#dbe4ee] space-y-2">
                  <div className="flex items-center gap-2 text-[#1f66a8] font-bold uppercase tracking-wider">
                    <Phone className="w-4 h-4" />
                    <span>{tr('Direct Hotline & WhatsApp')}</span>
                  </div>
                  <p className="text-[#0f2a4a] font-bold text-base">
                    <a href={`tel:${company.contact.phone.replace(/[^0-9]/g, '')}`} className="hover:text-[#1f66a8] transition-colors">
                      {company.contact.phoneDisplay}
                    </a>
                  </p>
                  <p className="text-[#56667a]">Instant response during operating production hours.</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f9fc] border border-[#dbe4ee] space-y-2">
                  <div className="flex items-center gap-2 text-[#1f66a8] font-bold uppercase tracking-wider">
                    <Mail className="w-4 h-4" />
                    <span>{tr('Official Quotations & Pre-Press Files')}</span>
                  </div>
                  <p className="text-[#0f2a4a] font-bold text-sm">
                    <a href={`mailto:${company.contact.email}`} className="hover:text-[#1f66a8] transition-colors">
                      {company.contact.email}
                    </a>
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f9fc] border border-[#dbe4ee] space-y-2">
                  <div className="flex items-center gap-2 text-[#1f66a8] font-bold uppercase tracking-wider">
                    <Clock className="w-4 h-4" />
                    <span>{tr('Operating Shifts')}</span>
                  </div>
                  <p className="text-[#0f2a4a] font-medium text-xs">
                    {company.contact.hours}
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-4 rounded-full bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-[#20ba5a] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{tr('Start WhatsApp Chat with Plant Manager')}</span>
                </button>
              </div>
            </div>

            {/* Right Contact / Quote Request Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#f7f9fc] rounded-3xl p-8 sm:p-10 border border-[#dbe4ee] shadow-xl">
                <div className="space-y-2.5 mb-8">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0f2a4a] tracking-tight leading-tight">
                    Request a Customized <span className="bg-gradient-to-r from-[#1f66a8] via-[#15b498] to-[#1f66a8] bg-clip-text text-transparent">Print Estimate</span>
                  </h3>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="h-[2px] w-10 bg-[#15b498] rounded-full"></span>
                    <span className="h-px w-6 bg-[#dbe4ee] rounded-full"></span>
                  </div>
                  <p className="text-xs text-[#56667a]">
                    Fill in your details below. Validated on submit and stored locally in browser storage.
                  </p>
                </div>

                {submittedId ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-emerald-200 space-y-5">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-widest font-bold text-[#1f66a8]">Reference Code: #{submittedId}</span>
                      <h4 className="font-serif text-2xl font-bold text-[#0f2a4a]">Proposal Request Recorded</h4>
                      <p className="text-xs text-[#56667a] max-w-md mx-auto">
                        Thank you, <strong>{formData.fullName}</strong>. Your project inquiry has been received. Our printing team at the Naraina plant will review your requirements and share an official quote shortly.
                      </p>
                    </div>

                    <div className="p-4 bg-[#f7f9fc] rounded-xl border border-[#dbe4ee] text-xs text-left space-y-1.5 max-w-sm mx-auto">
                      <div className="flex justify-between">
                        <span className="text-[#56667a]">Service:</span>
                        <span className="font-semibold">{formData.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#56667a]">Est. Batch:</span>
                        <span className="font-semibold">{formData.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#56667a]">Phone:</span>
                        <span className="font-semibold">{formData.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-xs hover:bg-[#20ba5a] transition-colors"
                      >
                        Fast-Track on WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubmittedId(null)}
                        className="px-6 py-3 rounded-full bg-[#0f2a4a] text-white font-semibold text-xs hover:bg-[#17375e] transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Vikramaditya Singhania"
                          className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs text-[#0f2a4a] focus:outline-none ${
                            errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                          }`}
                        />
                        {errors.fullName && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="corporate@brand.com"
                          className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs text-[#0f2a4a] focus:outline-none ${
                            errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            className={`w-full pl-12 pr-4 py-2.5 rounded-xl bg-white border text-xs text-[#0f2a4a] focus:outline-none ${
                              errors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                          Estimated Quantity
                        </label>
                        <input
                          type="text"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          placeholder="e.g. 100, 500, 2500"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                          Product Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                        >
                          <option value="Business Essentials">Business Essentials</option>
                          <option value="Clothing, Caps & Bags">Clothing, Caps & Bags</option>
                          <option value="Made by You & Stationery">Made by You & Stationery</option>
                          <option value="Home, Drinkware & Gifts">Home, Drinkware & Gifts</option>
                          <option value="Signage, Awards & More">Signage, Awards & More</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                          Required Service
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                        >
                          {services.map(s => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Target Delivery Date
                      </label>
                      <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-xs text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                        Project Specifications & Dimensions <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Mention paper GSM, debossing requirements, pantone color codes, or apparel embroidery positions..."
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs text-[#0f2a4a] focus:outline-none ${
                          errors.message ? 'border-red-400 focus:border-red-500' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                        }`}
                      />
                      {errors.message && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#dbe4ee]">
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="w-full sm:w-auto text-xs font-semibold text-[#128C7E] hover:underline flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-4 h-4 text-[#25D366]" />
                        <span>Inquire via WhatsApp instead</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0f2a4a] hover:bg-[#15b498] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? <span>Logging Inquiry...</span> : <>
                          <Send className="w-3.5 h-3.5" />
                        <span>{tr('Submit Request')}</span>
                        </>}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Google Maps / Studio Location Embed */}
      <section className="h-96 w-full relative bg-[#edf3f9] border-t border-[#dbe4ee] overflow-hidden">
        <iframe
          title="Ganesha Enterprises Naraina Map"
          src={company.contact.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
        ></iframe>

        <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#dbe4ee] max-w-sm hidden sm:block">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0f2a4a]">
            <Building2 className="w-4 h-4 text-[#1f66a8]" />
            Ganesha Enterprises Production Studio
          </div>
          <p className="text-[11px] text-[#56667a] mt-1">
            Naraina Industrial Area Phase 1, New Delhi
          </p>
        </div>
      </section>
    </div>
  );
}

