'use client';

import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultInterest?: string;
}

export default function LeadModal({
  isOpen,
  onClose,
  title = 'Claim Your THE FITNESS JUNCTION Membership',
  defaultInterest = 'Gym & Strength Training',
}: LeadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: defaultInterest,
    date: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Save lead to localStorage
    try {
      const existingLeads = JSON.parse(localStorage.getItem('fitwell_leads') || '[]');
      const newLead = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('fitwell_leads', JSON.stringify([...existingLeads, newLead]));
    } catch {
      // ignore
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#1C2333] border border-[#6EFF8F]/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-[#A3A3A3] hover:text-white hover:bg-gray-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 bg-[#6EFF8F]/20 rounded-full flex items-center justify-center mx-auto text-[#6EFF8F]">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-['Rajdhani',sans-serif] text-white uppercase">
              Request Received!
            </h3>
            <p className="text-[#A3A3A3] text-sm max-w-sm mx-auto">
              Thank you, <strong className="text-white">{formData.name}</strong>. Our certified fitness advisors will
              call you shortly at <strong className="text-[#6EFF8F]">{formData.phone}</strong>.
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="text-[#6EFF8F] font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-widest">
                Start Your Transformation
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Rajdhani',sans-serif] text-white uppercase mt-1">
                {title}
              </h3>
              <p className="text-[#A3A3A3] text-xs sm:text-sm mt-1">
                Lock in your trial pass, personal trainer, or free consultation today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[#131824] border border-[#242424] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#131824] border border-[#242424] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full bg-[#131824] border border-[#242424] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">
                    Interested In
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-[#131824] border border-[#242424] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#6EFF8F]"
                  >
                    <option value="Personal Training">Personal Training</option>
                    <option value="Group Workouts">Group Workouts</option>
                    <option value="Muscle Building">Muscle Building</option>
                    <option value="Nutrition Plans">Nutrition Plans</option>
                    <option value="Monthly Pass (₹1500/mo)">Monthly Pass (₹1500/mo)</option>
                    <option value="Yearly VIP (₹15000/yr)">Yearly VIP (₹15000/yr)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">
                  Goals or Message (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your target goals, preferred time, etc."
                  className="w-full bg-[#131824] border border-[#242424] rounded-lg px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6EFF8F]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-lg bg-[#6EFF8F] text-[#050505] hover:bg-[#50D878] font-['Rajdhani',sans-serif] font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-[#6EFF8F]/20"
              >
                <span>Submit Request</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
