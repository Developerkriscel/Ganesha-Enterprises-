import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, MessageSquare, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { company } from '../data/company';

export default function QuoteModal({ isOpen, onClose, initialProduct = '', initialService = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: 'Business Essentials',
    service: 'Corporate & Office Printing',
    quantity: '250',
    deliveryDate: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);

  useEffect(() => {
    if (initialProduct) {
      setFormData(prev => ({ ...prev, message: `Inquiry regarding: ${initialProduct}` }));
    }
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialProduct, initialService]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmittedRef(null);
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid corporate or personal email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else {
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10 || !/^[6-9]\d{9}$/.test(cleanPhone.slice(-10))) {
        newErrors.phone = 'Please enter a valid 10-digit Indian mobile number (e.g., 9650044234).';
      }
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please briefly outline your printing specifications or requirements.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        const existing = JSON.parse(localStorage.getItem('ge_quote_inquiries') || '[]');
        existing.unshift(submission);
        localStorage.setItem('ge_quote_inquiries', JSON.stringify(existing));
      } catch (err) {
        console.error('Failed to store demo submission in localStorage:', err);
      }

      setIsSubmitting(false);
      setSubmittedRef(quoteId);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#15b498', '#0f2a4a', '#f7f9fc', '#1f66a8']
      });
    }, 700);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello Ganesha Enterprises,\nI am requesting a quote for:\n• Name: ${formData.fullName || 'Client'}\n• Category: ${formData.category}\n• Service: ${formData.service}\n• Quantity: ${formData.quantity}\n• Details: ${formData.message || 'Custom printing query'}`
    );
    window.open(`https://wa.me/919650044234?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#f7f9fc] rounded-3xl shadow-2xl border border-[#dbe4ee] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-[#dbe4ee]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf3f9] text-[#1f66a8] text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Studio Inquiries
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0f2a4a]">Request an Executive Proposal</h3>
            <p className="text-xs text-[#56667a] mt-0.5">Custom specifications • Rapid proofing • Pan-India logistics</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#56667a] hover:text-[#0f2a4a] hover:bg-[#edf3f9] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedRef ? (
          <div className="p-8 text-center space-y-6 bg-white">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#1f66a8]">Reference #{submittedRef}</span>
              <h4 className="font-serif text-2xl font-bold text-[#0f2a4a]">Proposal Request Recorded</h4>
              <p className="text-sm text-[#56667a] max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Your project specifications have been logged securely. Our senior print architect at the Naraina plant will review your substrate and color specifications.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f7f9fc] border border-[#dbe4ee] max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#56667a]">Contact Phone:</span>
                <span className="font-semibold text-[#0f2a4a]">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#56667a]">Email Address:</span>
                <span className="font-semibold text-[#0f2a4a]">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#56667a]">Category & Service:</span>
                <span className="font-semibold text-[#0f2a4a]">{formData.category} — {formData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#56667a]">Est. Batch Size:</span>
                <span className="font-semibold text-[#0f2a4a]">{formData.quantity} units</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20ba5a] transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                Fast-Track on WhatsApp (+91 96500 44234)
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-[#0f2a4a] text-white font-semibold text-sm hover:bg-[#17375e] transition-all"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
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
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#0f2a4a] focus:outline-none transition-colors ${
                    errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. contact@company.com"
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#0f2a4a] focus:outline-none transition-colors ${
                    errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
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
                    className={`w-full pl-12 pr-4 py-2.5 rounded-xl bg-white border text-sm text-[#0f2a4a] focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                  Estimated Quantity / Batch
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. 50, 250, 1000, 5000"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-sm text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-sm text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                >
                  <option value="Business Essentials">Business Essentials</option>
                  <option value="Clothing, Caps & Bags">Clothing, Caps & Bags</option>
                  <option value="Made by You & Stationery">Made by You & Stationery</option>
                  <option value="Home, Drinkware & Gifts">Home, Drinkware & Gifts</option>
                  <option value="Signage, Awards & Large Format">Signage, Awards & Large Format</option>
                  <option value="Other Bespoke Work">Other Bespoke Work</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                  Required Service
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-sm text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
                >
                  <option value="Corporate & Office Printing">Corporate & Office Printing</option>
                  <option value="Marketing & Promotional Printing">Marketing & Promotional Printing</option>
                  <option value="Customized Corporate Merchandise">Customized Corporate Merchandise</option>
                  <option value="Luxury Packaging & Custom Labels">Luxury Packaging & Custom Labels</option>
                  <option value="Large Format & Event Printing">Large Format & Event Printing</option>
                  <option value="Books, Calendars & Fine Photo">Books, Calendars & Fine Photo</option>
                  <option value="Premium Finishing & Foil Stamping">Premium Finishing & Foil Stamping</option>
                  <option value="3D Design & Precision Awards">3D Design & Precision Awards</option>
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
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#dbe4ee] text-sm text-[#0f2a4a] focus:border-[#1f66a8] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f2a4a] mb-1.5">
                Project Details & Substrate Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention desired paper GSM, dimensions, Pantone colors, foiling / embossing, and any specific deadline requirements..."
                className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#0f2a4a] focus:outline-none transition-colors ${
                  errors.message ? 'border-red-400 focus:border-red-500' : 'border-[#dbe4ee] focus:border-[#1f66a8]'
                }`}
              />
              {errors.message && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-[#dbe4ee]">
              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#25D366]/40 text-[#128C7E] bg-white hover:bg-[#25D366]/10 text-xs font-semibold transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                WhatsApp Inquiry (+91 96500 44234)
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#0f2a4a] text-white hover:bg-[#15b498] text-xs font-semibold uppercase tracking-wider transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

